import React, {Component} from 'react';
import Message from './Message';
import { db } from '../fire'
import Chat from './Chat'

export default () => <Chat room={db.collection('test-chat')}/>
