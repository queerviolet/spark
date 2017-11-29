const functions = require('firebase-functions')
    , admin = require('firebase-admin')
    , lib = require('./lib')
    , nodemailer = require('nodemailer')
    , cookieParser = require('cookie-parser')()
    , validateUser = require('./validate-user')(admin)

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

// const sendmail = require('sendmail')();


// const sendInvite = (email, tripId) => {
//     console.log('inside of sendInvite', email, tripId);
//     return sendmail({
//         from: 'joinatrip@triphub.notasite',
//         to: email,
//         subject: `You've been invited to join a trip!`,
//         html: `Start a new trip with your friends using TripHub. \n \n Please sign up or login at triphub.herokuapp.com. Then go to triphub.herokuapp.com/${tripId}`,
//     }, function (err, reply) {
//         console.log('err and reply inside of sendInvite ---->', err, reply);
//         console.log(err && err.stack);
//         console.dir(reply);
//     });
// };


exports.joinTripFromInvite = functions.https.onRequest(
    require('express')()
        .use('/api/join/:inviteId', (req, res, next) => {
            console.log('tyring out this use thang',req.params);
            req.inviteId = req.params.inviteId
            next()
        })
        .use(cookieParser)
        .use(validateUser)
        .use((req, res) => {
            const { uid } = req.user;
            console.log('uid -----> ', uid, ' <---- inviteId ----> ', req.inviteId)
            db.collection('invites').doc(req.inviteId).get()
                .then(function (doc) {
                    if (doc.exists) {
                        const {tripId} = doc.data();
                        db.collection('trips').doc(tripId).update({[`users.${uid}`]: true})
                            .then(() => doc._ref.delete() )
                            .then(() => res.send({ user: req.user, tripId: tripId }))
                    } else {
                        console.error("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            // go to invites -> use inviteId to get the tripId
            // add user to the trip using tripId
            // delete that invite thing
            // then send back tripId
            // res.send({
            // // DO THE FIRESTORE THINGS AND RES.SEND THE TRIP ID
            // query: req.query,
            // inviteId: req.inviteId,
            // user: req.user,
            // })
        }))

exports.bot = functions.firestore
    .document('trips/{tripId}/chat/{messageId}')
    .onCreate(lib.runBotFromMessageEvent()); //pass in tripId

/*
➜  $ firebase experimental:functions:shell

firebase > bot({from: 'annelise', text: '/search for HI'}, {params: {tripId: '5TT8NzzvNVZAvd8SbEyQ'}})
*/

exports.sendInvite = functions.firestore
    .document('/invites/{inviteId}')
    .onCreate(event => {
        const user = functions.config().gmail.user
            , pass = functions.config().gmail.password
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass }
        });

        var {email, tripName, displayName} = event.data.data();
        var inviteId = event.data.id;

        const mailOptions = {
            from: user, // sender address
            to: email, // list of receivers
            subject: 'You\'ve been invited to join a trip!', // Subject line
            html: `<p>${displayName} invited you to join their trip: ${tripName}</p><p>Go to https://www.capstone-98fe9.firebaseapp.com/join/${inviteId} to start planning.</p><p>Have a great trip!</p>`// plain text body
        };

        return new Promise((resolve, reject) =>
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {return reject(err)}
                resolve(info)
            }));
    });





    // .document('/users/{userId}')
    // .onUpdate(event => {
    //     console.log('***********got event and event.data and event.data.data()', event.data);

    //     const {invitee, tripId} = event.data.data();
    //     console.log('invitee is: ', invitee);

    //     if (invitee === '') {
    //         console.log('thinks invitee is blank: ');
    //         return;
    //     }
    //     return sendInvite(invitee, tripId);
    //     // return event.data.set({invitee: '', tripId: ''}, {merge: true});
    // });

