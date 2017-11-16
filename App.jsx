import firebase from '~/fire'
import Messages from './Messages'
import React from 'react'

const db = firebase.firestore()

export default () => <Messages room={db.collection('test-room')}/> 





