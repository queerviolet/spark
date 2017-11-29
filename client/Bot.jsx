const debug = require('debug')('bot')

import {getCoords, getActivityTypes, topPlaces} from './GetGeo'

export const runBotFromMessageEvent = (always = false) => async event => {
  const msg = event.data.data()
  const chat = event.data.ref.parent
  const trip = chat.parent

  if (!always) {
    if ((await trip.get()).data().suppressBot) return
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

  const {GeoPoint} = trip.firestore.constructor
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
    rsp = '🤖 Bot will set location to: ' + location;
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
    rsp = '🤖 Bot added ' + msg.substring(4) + ' to pins board';

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

    const [event, dateTime] = msg.substring(10).split(' @ ');
    rsp = '🤖 Bot added ' + event + ' to itinerary';

    return chat.parent.collection('event')
      .where('name', '==', event)
      .get()
      .then(function (querySnapshot) {
        if(querySnapshot.size) {
          querySnapshot.forEach(doc => {
            chat.parent.collection('event').doc(doc.id).set({itineraryStatus: true, time: new Date(dateTime)}, {merge: true})
          })
        }
        else {
          chat.parent.collection('event').add({
          name: event,
          likes: {},
          type: 'event',
          comment: [],
          itineraryStatus: true,
          time: new Date(dateTime)
        })}
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
      .then(() => {
        return chat.add({
          time: new Date(),
          text: rsp,
          from: 'Your buddy Bot'
        });
      })

  }

  else if (cmd.startsWith('remove pin ')) {
    const pinned = msg.substring(11)
    console.log(pinned)
    rsp = '🤖 Bot removed ' + pinned + ' from pinned events';

    return chat.parent.collection('event')
    .where('name', '==', pinned)
    .get()
    .then(function (querySnapshot) {
      if(querySnapshot.size) {
        querySnapshot.forEach(doc => {
          chat.parent.collection('event').doc(doc.id).delete({merge: true})
        })
      }
    })
    .then(() => {
      return chat.add({
        time: new Date(),
        text: rsp,
        from: 'Your buddy Bot'
      });
    })
  }

  else if (cmd.startsWith('i love you bot')) {
    rsp = '🤖 Bot loves you too';

    return chat.add({
      time: new Date(),
      text: rsp,
      from: 'Your buddy Bot'
    });
  }

  else {
    rsp = "🤖 Sorry I don't understand that command yet. Here are some example commands you can use:     📍 Set location to New York     🍽 Search for restaurants    📌 Pin Central Park    📌 Remove pin Central Park    📆 Add event Central Park @ 11/12/13 1:23 PM";
    return chat.add({
      time: new Date(),
      text: rsp,
      from: 'Your buddy Bot'
    });
  }
}

