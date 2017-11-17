import config from './config'
import firebase from 'firebase'
//import firebaseui from 'firebaseui'
import 'firebase/firestore'

// export const uiConfig = {
//   signInSuccessUrl: '/',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '/'
// };



firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase
export const db = firebase.firestore()
export const tripById = (id) => db.collection('trips').doc(id)

// Initialize the FirebaseUI Widget using Firebase.
// export const ui = new firebaseui.auth.AuthUI(firebase.auth());
