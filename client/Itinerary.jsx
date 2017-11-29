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
      events: [],
      dates: props.startDate ?
      tripDates(props.startDate, props.endDate):
      [],
      showAdd: false,
      room: this.props.room
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    this.unsubscribeEvents = null;
    this.unsubscribeTrip = null;
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({dates: tripDates(nextProps.startDate, nextProps.endDate)});
  // }

  componentDidMount() {
    this.setState({room: this.props.room})
    this.unsubscribeEvents = this.props.room.orderBy('time').onSnapshot((snapshot) => {
      console.log("SOMESTRING: ", snapshot.docs)

      this.setState({events: snapshot.docs});
    });
    this.unsubscribeTrip = this.props.trip.onSnapshot(snapshot => {
      const {startDate, endDate} = snapshot.data();
      if ( startDate !== this.props.startDate || endDate !== this.props.endDate){
        this.setState({dates: tripDates(startDate, endDate)})
      }
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({ room: nextProps.room })

    this.unsubscribeEvents();
    this.unsubscribeTrip();

    this.unsubscribeEvents = nextProps.room.orderBy('time').onSnapshot((snapshot) => {
      console.log("SECOND CONSOLE: ", snapshot.docs)

      this.setState({ events: snapshot.docs });
    });
    this.unsubscribeTrip = nextProps.trip.onSnapshot(snapshot => {
      const { startDate, endDate } = snapshot.data();
      if (startDate !== nextProps.startDate || endDate !== nextProps.endDate) {
        this.setState({ dates: tripDates(startDate, endDate) })
      }
    })
  }


  handleAddButton(evt, name, time){
    //evt.preventDefault();
    const trip = this.state.room.parent
    this.setState({showAdd: !this.state.showAdd});
    this.state.room.add({ name, time, itineraryStatus: true });
    if (!this.state.dates[0] || time < this.state.dates[0]) { trip.set({ startDate: time }, { merge: true }) }
    if (!this.state.dates[-1] || time > this.state.dates[-1]) { trip.set({ endDate: time }, { merge: true }) }
  }

  render() {
    console.log("THIS.STATE.DATES: ", this.state.dates)
    const now = (new Date()).toDateString()
    return (
      <div className="col-md-6 panel">
        <div className="itin-header">
          <h3>Itinerary</h3>
          <i className="fa fa-plus-square" onClick={() => {this.setState({showAdd: !this.state.showAdd})}} />
        </div>
        {this.state.showAdd &&
          <AddEvent
            startDate={this.state.dates[0]}
            endDate={this.state.dates[-1]}
            room={this.props.room}
            closeForm={this.handleAddButton} />}
        <div className="event-scroll">{
          this.state.dates.map((date, index) => (
            <div className={`date-box ${date === now ? 'today' : ''}`} key={index}>
              <p className="date-text">{date}</p>
              <div>
                {this.state.events.map((event, idx) => {
                  console.log("EVENT.DATA ", event.data())
                  const { itineraryStatus, time } = event.data();
                  const eventDate = time.toDateString && time.toDateString();
                  return itineraryStatus && (eventDate === date ) && (
                    <Event key={idx} room={this.props.room} {...event.data() } eventId={event.id} userId={this.props.user.uid} />
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
