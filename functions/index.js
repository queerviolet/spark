const functions = require('firebase-functions')
    lib = require('./lib')

exports.helloWorld = functions.https.onRequest((request, response) =>
   response.send(lib))

exports.bot = functions.firestore
    .document('trips/{tripId}/chat/{messageId}')
    .onCreate(event => {
        console.log('yo.')
        const msg = event.data.data()
        const chat = event.data.ref.parent
        console.log(msg)
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
