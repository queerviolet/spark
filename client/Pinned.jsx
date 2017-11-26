import React from 'react';
import {db} from '../fire';
import Event from './Event';

export default class Pinned extends React.Component {
    constructor(){ //props is the events we tell the bot to pin?
        super();
        this.state = {
            events: [],
            itineraryStatus: false,
            time: null
            }
        }
        //this.handleSubmit = this.handleSubmit.bind(this);

    componentDidMount(){
        this.props.room.onSnapshot((snapshot) => {
            this.setState({ events: snapshot.docs });
        });
    }


    render() {
        return (
            <div className="col-md-6">
                <h3>Pinned Events</h3>
                <div className="pin-wrap">{this.state.events.map((event, index) => {
                    const pinned = !event.data().itineraryStatus;
                    return pinned && <Event room={this.props.room} key={index} {...event.data() } eventId={event.id} userId={this.props.user.uid} />;
                })}</div>
            </div>
        )
    }
}
