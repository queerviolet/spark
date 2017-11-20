import React, { Component } from 'react'

import './Event.css'

export default class Event extends Component {
    render() {
        const isItin = this.props.itineraryStatus;
        console.log('name: ', this.props.name, ' is itinerary? ', isItin)
        return (
            isItin
            ?
            <div>
                <h1>{this.props.name}</h1>
                <p>{this.props.time}</p>
            </div>
            :
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.image}</p>
                <p>{this.props.description}</p>
            </div>

        )
    }
}

