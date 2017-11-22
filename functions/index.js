const functions = require('firebase-functions')
    lib = require('./lib')

exports.helloWorld = functions.https.onRequest((request, response) =>
   response.send(lib))

exports.bot = functions.firestore
    .document('trips/{tripId}/chat/{messageId}')
    .onCreate((event) => lib.runBotFromMessageEvent(event)) //pass in tripId

/*
➜  $ firebase experimental:functions:shell
✔  functions: helloWorld
✔  functions: bot

firebase > bot({from: 'annelise', text: '/search for HI'}, {params: {tripId: '5TT8NzzvNVZAvd8SbEyQ'}})
*/