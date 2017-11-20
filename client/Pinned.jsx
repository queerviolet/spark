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
            <div>
                <h3>HI FROM PINNED</h3>
                <div>{this.state.events.map((event, index) => {
                    const pinned = !event.data().itineraryStatus;
                    return pinned && <Event key={index} {...event.data() } />;
                })}</div>
            </div>
        )
    }
}
