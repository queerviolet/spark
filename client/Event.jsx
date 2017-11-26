import React, { Component } from 'react'

export default class Event extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike (evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId);

        let likes;
        eventRef.get().then(function (event) {
            if (event.exists) {
                likes = event.data().likes;
            } else {
                likes = {counter: 0};
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })
        .then( () => {
            const userBefore = likes[this.props.userId] || false;

            if (!userBefore) {
                eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter + 1 }) }, { merge: true });
            } else {
                eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter - 1 }) }, { merge: true });
            }

        })

    }

    render() {
        const isItin = this.props.itineraryStatus;
        return (
            isItin
            ?
            <div className="event">
                <li>{`${this.props.name} @ ${this.props.time.toLocaleTimeString()}`}</li>

            </div>
            :
            <div className="event pin-event">
                <span className="yellow badge" onClick={this.handleLike}>{this.props.likes ? this.props.likes.counter : 0 } &hearts;</span>
                <p><b>{this.props.name}</b></p>
                <p>{this.props.description}</p>

            </div>

        )
    }
}


// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
