import React, {Component} from 'react';
import { db } from '../fire'
import Chat from './Chat'
import Pinned from './Pinned'

export default class Trip extends Component {

        render(){
            return (
            <div>
                <Chat room={db.collection('trips').doc(this.props.match.params.tripId).collection('chat')} user={this.props.user}/>
                <Pinned room={db.collection('trips').doc(this.props.match.params.tripId).collection('event')} user={this.props.user}/>
            </div>
            )
        }
    }
