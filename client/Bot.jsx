import { db } from '../fire'

export function botReceiveMessage(msg, room){
  console.log('bot received: ', msg);
  let cmd = msg.toLowerCase();
  let rsp;

  if (cmd.startsWith('set location to ')){
    rsp = 'Bot will set location to: ' + msg.substring(16);
  }

  else if (cmd.startsWith('search for ')){
    rsp = 'Bot will search for: ' + msg.substring(11);
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

}

// function sendMessage(message){

// }
