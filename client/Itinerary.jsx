import React from 'react';
import {Event, AddEvent} from './index';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
function tripDates(startDate, endDate){
  console.log('inside of trip dates: ', startDate, endDate)
  let range = moment.range(startDate, endDate);
  range = Array.from(range.by('day')).map(day => {
    return day.toDate().toDateString();
  });
  return range;
}

export default class Itinerary extends React.Component {
  constructor(props) { //props is the events we tell the bot to pin?
    super(props);
    console.log('props inside of itinerary', props);
    this.state = {
      events: [],
      dates: tripDates(props.startDate, props.endDate),
      showAdd: false
    };
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({dates: tripDates(nextProps.startDate, nextProps.endDate)});
  }

  componentDidMount() {
    this.props.room.orderBy('time').onSnapshot((snapshot) => {
      this.setState({events: snapshot.docs});
    });
  }

  handleAddButton(){
    //evt.preventDefault();
    this.setState({showAdd: !this.state.showAdd});
  }

  render() {
    console.log('itinerary rendered')
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
