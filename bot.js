var admin = require("firebase-admin");

var serviceAccount = require("./admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://capstone-98fe9.firebaseio.com"
});

const db = admin.firestore()


// const TRIP_ID = '5TT8NzzvNVZAvd8SbEyQ'

let tripIds = [];

const runBot = require('./functions/lib').runBotFromMessageEvent(true)

db.collection('trips').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            tripIds.push(doc.id);
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    })
    .then(() => {
        tripIds.forEach(TRIP_ID => {
            const trip = db.collection('trips').doc(TRIP_ID)

            trip.set({ suppressBot: true }, { merge: true })
            process.on('beforeExit', () => trip.set({ suppressBot: false }, { merge: true }))

            trip.collection('chat')
                .onSnapshot(async snap => {
                    for (let change of snap.docChanges) {
                        if (change.type === 'added') {
                            runBot({ data: change.doc }).catch(console.error)
                        }
                    }
                })

        })
        console.log('got all tripIds: ', tripIds)
    });







