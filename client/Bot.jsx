import { db } from '../fire'
import {getCoords, getActivityTypes} from './GetGeo'

export function botReceiveMessage(msg, room){
  console.log('bot received: ', msg);
  let cmd = msg.toLowerCase();
  let rsp;

  if (cmd.startsWith('set location to ')){
    var city = msg.substring(16)
    //rsp = 'Bot will set location to: ' + city;
    getCoords(city);
    rsp = 'Here are the top places in '+ city + ":";
    // getCoords(city);

  }

  else if (cmd.startsWith('search for ')){
    var type = msg.substring(11)
    rsp = 'Bot will search for: ' + type;
    //getActivityTypes(type);
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

  db.collection(room).add({
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
