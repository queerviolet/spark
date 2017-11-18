import React, {Component} from 'react';
import { db } from '../fire'
import Chat from './Chat'
import Pinned from './Pinned'

export default (props) => (
    <div>
        <Chat room={db.collection('test-chat')} user={props.user}/>
        <Pinned room={db.collection('test-event')} />
    </div>
)
