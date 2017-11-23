const functions = require('firebase-functions')
    lib = require('./lib')

const sendmail = require('sendmail')();


const sendInvite = (email) => {
    return sendmail({
        from: 'joinatrip@triphub.notasite',
        to: email,
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
    }, function (err, reply) {
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
        const user = event.data.data();
        const invitee = user.invitee;

        if (user.invitee === '') {
            return;
        }
        sendInvite(invitee);
        return event.data.set({invitee: ''}, {merge: true});

    })
