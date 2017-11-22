import React from 'react';
import {Event, AddEvent} from './index';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
function tripDates(startDate, endDate){
  console.log("IN TRIP DATES, START DATE: ", startDate, "END DATE: ", endDate)
  let range = moment.range(startDate, endDate);
  range = Array.from(range.by('day')).map(day => {
    return day.toDate().toDateString();
  });
  return range;
}

export default class Itinerary extends React.Component {
  constructor(props) { //props is the events we tell the bot to pin?
    super(props);
    this.state = {
      events: [],
      dates: tripDates(props.startDate, props.endDate),
      showAdd: false
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    console.log("INSIDE ITINERARY CONSTRUCTOR, PROPS: ", this.props)
  }

  componentDidMount() {
    this.props.room.orderBy('time').onSnapshot((snapshot) => {
      this.setState({events: snapshot.docs});
    });
    console.log("THIS.PROPS: ", this.props)
  }

  handleAddButton(){
    //evt.preventDefault();
    console.log('this is...', this);
    this.setState({showAdd: !this.state.showAdd});
  }

  render() {
    return (
      <div className="event-box">
        <h3>ITINERARY</h3>
        <button onClick={this.handleAddButton}>+</button>
        {this.state.showAdd &&
          <AddEvent
            room={this.props.room}
            closeForm={this.handleAddButton} />}
        <div>{
          this.state.dates.map((date, index) => (
            <div className="date-box" key={index}>
              <p className="date-text">{date}</p>
              <div>
                {this.state.events.map((event, idx) => {
                  const { itineraryStatus, time } = event.data();
                  const eventDate = time.toDateString && time.toDateString();
                  return itineraryStatus && (eventDate === date ) && (
                      <Event key={idx} {...event.data() } />
                  );}
                )}
              </div>
            </div>
          ))
        }</div>
      </div>
    );
  }
}
