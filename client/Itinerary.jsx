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
      var query = snapshot.where('time', '==', 'Thu Nov 23 2017')
      snapshot.docs.forEach(event => {
        const stateDates = this.state.dates;
        const date = event.data().time.toDateString() //date of the event
        if (dateOnState){ //if that date exists in the state dates object
          // updates the dates object that will need to update state
          let newDates = Object.assign({}, this.state.dates, {[date]: [...dateOnState, event]})
          this.setState({dates: newDates});
        }
      })
    });
  }


  render() {
    console.log('inside of itin render with state: ', this.state);
    console.log('keys of state dates', Object.keys(this.state.dates))
    return (
      <div className="itinerary-box">
        <h3>HI FROM ITINERARY</h3>
          <div>{this.state.events.map((event, index) => {
            const {itineraryStatus, time} = event.data();
            const date = time.toDateString && time.toDateString();
            return itineraryStatus && (
              <div key={index}>
                <Event {...event.data() } />
              </div>
            );
          })}</div>
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
