import firebase from '~/fire'
import Chat from './client/Chat'
import React from 'react'

const db = firebase.firestore()

export default () => <Chat room={db.collection('test-chat')}/>
