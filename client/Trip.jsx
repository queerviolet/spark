import React, {Component} from 'react';
import { db } from '../fire'
import {Chat, Pinned, Itinerary} from './index'

export default class Trip extends Component {

    constructor(){
        super()
        this.state = {
            isPartOfTrip: true,
            startDate: {},
            endDate: {}
        }
    }

    componentDidMount(){
        const tripRef = db.collection('trips').doc(this.props.match.params.tripId);

        tripRef.get().then(doc => {
            if (doc.exists && doc.data().users[this.props.user.uid]) {
                const { startDate, endDate } = doc.data();
                console.log("doc.data: ", doc.data())
                this.setState( {isPartOfTrip: true, startDate, endDate } );
                // console.log('this state is: ', this.state)
                // console.log("Document data:", doc.data().users[this.props.user.uid]);
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
        console.log("THIS.STATE: ", this.state)


        return (
            isPartOfTrip ?
            <div className="flex-row-wrap around">
                <Chat room={tripRef.collection('chat')} user={this.props.user} />
                <Itinerary
                    room={tripRef.collection('event')}
                    user={this.props.user}
                    startDate={this.state.startDate}
                    endDate = {this.state.endDate} />
                <Pinned room={tripRef.collection('event')} user={this.props.user} />
            </div>
            :
            <div>
                You need to be invited to this trip!
            </div>
        )
    }
}

