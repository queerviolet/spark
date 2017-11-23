const debug = require('debug')('bot')

import {getCoords, getActivityTypes, topPlaces} from './GetGeo'

export const runBotFromMessageEvent = (always = false) => async event => {
  const msg = event.data.data()
  const chat = event.data.ref.parent
  const trip = chat.parent
  console.log('inside of runBotFromMessageEvent')
  if (!always) {
    if ((await trip.get()).suppressBot) return
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

  if (cmd.startsWith('set location to ')){
    var city = msg.substring(16)
    rsp = 'Bot will set location to: ' + city;
    const {lat, lng} = await getCoords(city);
    console.log('coords:', lat, lng)
    trip.set({coords: new GeoPoint(lat, lng)}, {merge: true})
    trip.set({ city }, { merge: true })

  }

  else if (cmd.startsWith('search for ')){
    var type = msg.substring(11)
    rsp = 'Bot will search for: ' + type;
    getActivityTypes(type);
  }

  else if (cmd.startsWith('pin ')){
    rsp = 'Bot will add ' + msg.substring(4) + ' pin to board';
  }

  else if (cmd.startsWith('add event ')) {
    rsp = 'Bot will add ' + msg.substring(10) + ' event to itinerary';
  }

  else {
    rsp = "Sorry I don't understand that command yet. \nHere are some commands you can use: \n    Set location to __\n    Search for __\n    Pin __\n    Add event __";
  }
  //add a response for replying to users saying 'I dont know' when the bot
  //asks them a question

  return chat.add({
    time: new Date(),
    text: rsp,
    from: 'Your buddy Bot'
  });

  // getCoords('New York, NY');

}


// function sendMessage(message){

// }



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
