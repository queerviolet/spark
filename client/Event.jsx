import React, { Component } from 'react'

export default class Event extends Component {
    render() {
        const isItin = this.props.itineraryStatus;
        return (
            isItin
            ?
            <div className="event">
                <h1>{this.props.name}</h1>

            </div>
            :
            <div className="event">
                <p>{this.props.name}</p>
                <p>{this.props.image}</p>
                <p>{this.props.description}</p>
            </div>

        )
    }
}


// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
