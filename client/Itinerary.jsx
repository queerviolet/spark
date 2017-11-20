import React from 'react';
import { db } from '../fire';
import Event from './Event';

export default class Itinerary extends React.Component {
  constructor(props) { //props is the events we tell the bot to pin?
    super(props);
    this.state = {
      events: [],
      dates: tripDates(props.startDate, props.length),
      objectVersion: {}
    }
  }
  //this.handleSubmit = this.handleSubmit.bind(this);

  componentDidMount() {
    console.log('STATE DATES ======>', this.state.dates);
    this.props.room.orderBy('time').onSnapshot((snapshot) => {
      this.setState({events: snapshot.docs})
    });
  }


  render() {
    console.log('inside of itin render with state: ', this.state);
    return (
      <div className="itinerary-box">
        <h3>HI FROM ITINERARY</h3>
        <div>{
          this.state.dates.map((date, index) =>(
            <div key={index}>
              <p>{date}</p>
              <div>
                {this.state.events.map((event, idx) => {
                  const { itineraryStatus, time } = event.data();
                  const eventDate = time.toDateString && time.toDateString();
                  return itineraryStatus && (eventDate === date ) && (
                    <div key={idx}>
                      <Event {...event.data() } />
                    </div>
              )})}
              </div>
            </div>
          ))
        }</div>
      </div>
    )
  }
}

function tripDates(startDate, days) {
  var final = [];
  while (days !== 0) {
    var result = new Date(startDate);
    var counter = 0;
    result.setDate(result.getDate() + days);
    final.unshift(result.toDateString());
    days--;
  }
  return final;
}


/*

<div>{this.state.events.map((event, index) => {
            const {itineraryStatus, time} = event.data();
            const date = time.toDateString && time.toDateString();
            return itineraryStatus && (
              <div key={index}>
                <Event {...event.data() } />
              </div>
            );
          })}</div>
*/
