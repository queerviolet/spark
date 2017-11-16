import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase
export const db = firebase.firestore()
export const tripById = (id) => db.collection('trips').doc(id) 