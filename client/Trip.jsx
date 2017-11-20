import React, {Component} from 'react';
import { db } from '../fire'
import Chat from './Chat'
import Pinned from './Pinned'

export default class Trip extends Component {

    constructor(){
        super()
        this.state = {
            isPartOfTrip: false
        }
    }

    componentDidMount(){
        const tripRef = db.collection('trips').doc(this.props.match.params.tripId);

        tripRef.get().then(doc => {
            if (doc.exists && doc.data().users[this.props.user.uid]) {
                this.setState( {isPartOfTrip: true} );
                console.log("Document data:", doc.data().users[this.props.user.uid]);
            } else {
                console.log("No such document!");
            }
        }).catch(error => {
            console.log("Error getting document: ", error);
        })
    }

    render(){
        const tripRef = db.collection('trips').doc(this.props.match.params.tripId);
        let isPartOfTrip = this.state.isPartOfTrip;

        return (
            isPartOfTrip ?
            <div>
                <Chat room={tripRef.collection('chat')} user={this.props.user}/>
                <Pinned room={tripRef.collection('event')} user={this.props.user}/>
            </div>
            :
            <div>
                You need to be invited to this trip!
            </div>
        )
    }
}
