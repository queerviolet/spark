import React, {Component} from 'react';
import { db } from '../fire'
import Chat from './Chat'

export default (props) => {
  return (<Chat room={db.collection('test-chat')} user={props.user} />)
}
