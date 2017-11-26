const functions = require('firebase-functions')
    lib = require('./lib')

const sendmail = require('sendmail')();


const sendInvite = (email, tripId) => {
    console.log('inside of sendInvite', email, tripId)
    return sendmail({
        from: 'joinatrip@triphub.notasite',
        to: email,
        subject: `You've been invited to join a trip!`,
        html: `Start a new trip with your friends using TripHub. \n \n Please sign up or login at triphub.herokuapp.com. Then go to triphub.herokuapp.com/${tripId}`,
    }, function (err, reply) {
        console.log('err and reply inside of sendInvite ---->', err, reply)
        console.log(err && err.stack);
        console.dir(reply);
    });
};


exports.helloWorld = functions.https.onRequest((request, response) =>
   response.send(lib))

exports.bot = functions.firestore
    .document('trips/{tripId}/chat/{messageId}')
    .onCreate(lib.runBotFromMessageEvent()) //pass in tripId

/*
➜  $ firebase experimental:functions:shell
✔  functions: helloWorld
✔  functions: bot

firebase > bot({from: 'annelise', text: '/search for HI'}, {params: {tripId: '5TT8NzzvNVZAvd8SbEyQ'}})
*/

/*    .onCreate(event => {
        console.log('yo.')
        const msg = event.data.data()
        const chat = event.data.ref.parent
        console.log('event is: ', event);
        console.log('message is: ', msg)
        if (msg.text.startsWith('/')) {
            const cmd = msg.text.slice(1)
            console.log(cmd)

            // return lib.botReceiveMessage(cmd, chat)
            return chat.add({
                from: 'bot',
                text: cmd
            })
        }
    })
*/

exports.sendInvite = functions.firestore
    .document('/users/{userId}')
    .onUpdate(event => {
        console.log('got event and event.data and event.data.data()', event.data)

        const {invitee, tripId} = event.data.data();
        console.log('invitee is: ', invitee)

        if (invitee === '') {
            console.log('thinks invitee is blank: ')
            return;
        }
        return sendInvite(invitee, tripId)
        // return event.data.set({invitee: '', tripId: ''}, {merge: true});

    })
