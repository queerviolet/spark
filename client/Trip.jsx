import React, {Component} from 'react';
import { db } from '../fire'
import Chat from './Chat'
import Pinned from './Pinned'

export default () => (
    <div>
        <Chat room={db.collection('test-chat')}/>
        <Pinned room={db.collection('test-event')} />
    </div>
)