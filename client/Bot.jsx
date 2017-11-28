const debug = require('debug')('bot')

import {getCoords, getActivityTypes, topPlaces} from './GetGeo'

export const runBotFromMessageEvent = (always = false) => async event => {
  const msg = event.data.data()
  const chat = event.data.ref.parent
  const trip = chat.parent
  // console.log('trip is......... in runBot', trip)
  // console.log('inside of runBotFromMessageEvent')
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

  // console.log('trying to get info out of trip', ((await trip.get()).coords), 'pleaseeee')
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
    console.log(topFive)

    return chat.add({
      time: new Date(),
      from: 'Google Places',
      places: topFive,
      }) // change the formatting of the message in chat and then handle that in Message.jsx


    // rsp = `The top five places in ${location} are: * ${topFive[0].name} (${topFive[0].rating} stars)  * ${topFive[1].name} (${topFive[1].rating} stars)  * ${topFive[2].name} (${topFive[2].rating} stars)  * ${topFive[3].name} (${topFive[3].rating} stars) * ${topFive[4].name} (${topFive[4].rating} stars)`
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
    const [event, dateTime] = msg.substring(10).split('@');
    rsp = 'Bot added ' + event + ' to itinerary';
    // const event = msg.substring(10);

    return chat.parent.collection('event')
      .where('name', '==', event)
      .get()
      .then(function (querySnapshot) {
        if(querySnapshot.size) {
          querySnapshot.forEach(doc => {
            doc.set({itineraryStatus: true, time: new Date(dateTime)}, {merge: true})
          })
        }
        chat.parent.collection('event').add({
          name: event,
          likes: {},
          type: 'event',
          comment: [],
          itineraryStatus: true,
          time: new Date(dateTime)
        })
        // querySnapshot.forEach(function (doc) {
        //   console.log(doc.id, " => ", doc.data());
        // });
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

    // return chat.parent.collection('event')
    //   .add({
    //     name: msg.substring(4),
    //     comment: [],
    //     likes: {},
    //     itineraryStatus: true,
    //     description: '',
    //     type: 'event'
    //   })
    //   .then(() => {
    //     return chat.add({
    //       time: new Date(),
    //       text: rsp,
    //       from: 'Your buddy Bot'
    //     });
    //   })

    // return chat.add({
    //   time: new Date(),
    //   text: rsp,
    //   from: 'Your buddy Bot'
    // });
  }

  else {
    rsp = "Sorry I don't understand that command yet. Here are some commands you can use:     Set location to __    Search for __    Pin __    Add event __";
    return chat.add({
      time: new Date(),
      text: rsp,
      from: 'Your buddy Bot'
    });
  }
  //add a response for replying to users saying 'I dont know' when the bot
  //asks them a question
}


/*PLACE SEARCH
allows you tu query for place info on categories like PROMINENT POINTS OF INTEREST, geo loc and more.
can search by prox or TEXT STRING
RETURNS LIST OF PLACES ALONG WITH SUMMARY INFO ABOUT EACH

PLACE DETAILS
for a specific place based on place_id or refernece, more details about a particular establishment

PLACE SEARCH
required parameters - key (API key), location (lat, long around hwichh to retrive info), radius (distance in meters),

optional - keyword (term to be matched.. like restaurant or hotel?) (or keyword name? )
rankby (prominence sorts based on their importance), type (look at supported types page)
 *
 *
 *
 *
 *
 *
 *
 */
