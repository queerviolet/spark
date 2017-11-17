import * as firebase from 'firebase'
import 'firebase/firestore'
import setup from './setup'

setup(firebase)

export default firebase
export const firestore = firebase.firestore()
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()

// Export your models here. Example:
export const userById = id => db.collection('users').doc(id)