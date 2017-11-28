const debug = require('debug')('bot')

import {getCoords, getActivityTypes, topPlaces} from './GetGeo'

export const runBotFromMessageEvent = (always = false) => async event => {
  const msg = event.data.data()
  const chat = event.data.ref.parent
  const trip = chat.parent

  if (!always) {
    if ((await trip.get()).data().suppressBot) return //Ashi had us add .data() need to check that it works
  }

  if (msg.text && msg.text.startsWith('/')) {
    const cmd = msg.text.slice(1)
    return botReceiveMessage(cmd, chat, trip)
  }
}

export async function botReceiveMessage(msg, chat, trip){
  console.log('bot received: FROM BOT', msg);
  let cmd = msg.toLowerCase();
  let rsp;

  console.log('cmd=', cmd)

  const {GeoPoint} = trip.firestore.constructor//unsure why this is on trip
  let LAT, LNG;

  await trip.get().then(function (doc) {
    if (doc.exists) {
      const geoCoords = doc.data().coords
      console.log("Document data:", geoCoords._latitude, geoCoords._longitude);
      LAT = geoCoords._latitude;
      LNG = geoCoords._longitude
    } else {
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });


  if (cmd.startsWith('set location to ')){
    var location = msg.substring(16)
    rsp = 'Bot will set location to: ' + location;
    const {lat, lng} = await getCoords(location);
    trip.set({coords: new GeoPoint(lat, lng)}, {merge: true})
    trip.set({ location }, { merge: true })
    const topFive = await topPlaces({lat, lng})

    return chat.add({
      time: new Date(),
      from: 'Google Places',
      places: topFive,
      })
  }

  else if (cmd.startsWith('search for ')){
    var type = msg.substring(11)
    const coords = {lat: LAT, lng: LNG}
    const topFive = await getActivityTypes(coords, type);

    return chat.add({
      time: new Date(),
      from: 'Google Places',
      places: topFive,
      })
  }

  else if (cmd.startsWith('pin ')){
    rsp = 'Bot added ' + msg.substring(4) + ' to pins board';

    return chat.parent.collection('event')
      .add({
        name: msg.substring(4),
        comment: [],
        likes: {},
        itineraryStatus: false,
        description: '',
        type: 'event'
      })
      .then(() => {
        return chat.add({
          time: new Date(),
          text: rsp,
          from: 'Your buddy Bot'
        });
      })
  }

  else if (cmd.startsWith('add event ')) {
    // 'add event ____ @ _____
    const [event, dateTime] = msg.substring(10).split(' @ ');
    rsp = 'Bot added ' + event + ' to itinerary';
    // const event = msg.substring(10);
    // console.log('event issss =======>>>>>', event, 'lalala');

    return chat.parent.collection('event')
      .where('name', '==', event)
      .get()
      .then(function (querySnapshot) {
        // console.log('for querySnapshot with size', querySnapshot.docs.length)
        if(querySnapshot.size) {
          querySnapshot.forEach(doc => {
            // console.log('got doc and hopefully an id', doc.id);
            // console.log('is this a reference?', chat.parent.collection('event').doc(doc.id))
            chat.parent.collection('event').doc(doc.id).set({itineraryStatus: true, time: new Date(dateTime)}, {merge: true})
          })
        }
        else {
          // console.log('querysnapshot size shouldve been zero so now were adding a new one')
          chat.parent.collection('event').add({
          name: event,
          likes: {},
          type: 'event',
          comment: [],
          itineraryStatus: true,
          time: new Date(dateTime)
        })}
        // querySnapshot.forEach(function (doc) {
        //   console.log(doc.id, " => ", doc.data());
        // });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
      .then(() => {
        // console.log('inside the last then when we create a new message from the bot', rsp);
        return chat.add({
          time: new Date(),
          text: rsp,
          from: 'Your buddy Bot'
        });
      })

  }

  else if (cmd.startsWith('remove pin ')) {
    console.log("@@@@@@@@@@@@@@@@@@@@@", msg.substring(11))


    rsp = 'Bot removed ' + msg.substring(11) + ' from pinned events';
  }

  else {
    rsp = "Sorry I don't understand that command yet. Here are some example commands you can use:     Set location to New York     Search for restaurants    Pin Central Park    Add event Central Park @ 11/12/13 1:23 PM";
    return chat.add({
      time: new Date(),
      text: rsp,
      from: 'Your buddy Bot'
    });
  }
}

  //add a response for replying to users saying 'I dont know' when the bot
  //asks them a question
