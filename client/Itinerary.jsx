import React from 'react';
import {Event, AddEvent} from './index';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
function tripDates(startDate, endDate){
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
      // room: props.room,
      events: [],
      // startDate: props.startDate,
      // endDate: props.endDate,
      // dates: props.startDate ?
      // tripDates(props.startDate, props.endDate):
      // [],
      showAdd: false,
      // room: this.props.room
    };
    this.handleAddButton = this.handleAddButton.bind(this);
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({dates: tripDates(nextProps.startDate, nextProps.endDate)});
  // }

  componentDidMount() {
    this.unsubscribe = this.props.room.orderBy('time').onSnapshot((snapshot) => {
      this.setState({events: snapshot.docs});
    });
    // this.props.trip.onSnapshot(snapshot => {
    //   const {startDate, endDate} = snapshot.data();
    //   if ( startDate !== this.props.startDate || endDate !== this.props.endDate){
    //     this.setState({dates: tripDates(startDate, endDate)});
    //   }
    // });
  }

  componentWillReceiveProps(nextProps){
    this.unsubscribe && this.unsubscribe();
    if(this.props !== nextProps) {this.props = nextProps}
    // await this.setState({room: nextProps.room, startDate: nextProps.startDate, endDate: nextProps.endDate});
    this.unsubscribe = nextProps.room.orderBy('time').onSnapshot((snapshot) => {
      this.setState({ events: snapshot.docs });
    });
  }


  handleAddButton(evt, name, time){
    //evt.preventDefault();
    const trip = this.props.room.parent
    this.setState({showAdd: !this.state.showAdd});
    this.props.room.add({ name, time, itineraryStatus: true });
    if (!this.props.startDate || time < this.props.startDate) {
      trip.set({ startDate: time }, { merge: true }) }
    if (!this.props.endDate || time > this.props.endDate) {
      trip.set({ endDate: time }, { merge: true }) }
  }

  render() {
    const now = (new Date()).toDateString();
    const dates = tripDates(this.props.startDate, this.props.endDate);
    return (
      <div className="col-md-6">
        <div className="itin-header">
          <h3>Itinerary</h3>
          <i className="fa fa-plus-square" onClick={() => {this.setState({showAdd: !this.state.showAdd})}} />
        </div>
        {this.state.showAdd &&
          <AddEvent
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            room={this.props.room}
            closeForm={this.handleAddButton} />}
        <div className="event-scroll">{
          dates.map((date, index) => (
            <div className={`date-box ${date === now ? 'today' : ''}`} key={index}>
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
