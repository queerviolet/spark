import React, { Component } from 'react';


/*  HELPERS FOR THE OPTIONS BELOW  */
let days = [];
( () => {
  for (var i = 1; i < 32; i++){
    days.push(i);
  }
})();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
let minutes = ['00', '15', '30', '45'];
/*  END HELPER  */


/*  START COMPONENT  */
/* UNHANDLED ISSUES  -->
    days should be options for valid days that month...
    there ain't no February 31st
*/

export default class AddEvent extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      month: 'January',
      day: '1',
      year: '2017',
      hour: '12',
      minute: '00',
      ampm: 'PM',
      startDate: {},
      endDate: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    const {month, day, year, hour, minute, ampm, name} = this.state;
    const time = new Date(month + ' ' + day + ' ' + year + ' ' + hour + ':' + minute + ' ' + ampm);
    //const trip = this.props.room.parent

    /*  ADD EVENT TO EVENTS COLLECTION  */
    // this.props.room.add({name, time, itineraryStatus: true});

    // /*  RESET START OR END DATE IF THE EVENT TIME IS OUTSIDE THE RANGE  */
    // console.log("START DATE: ", this.props.startDate, "END DATE: ", this.props.endDate)
    // if (!this.props.startDate || time < this.props.startDate){ trip.set({startDate: time}, {merge: true}) }
    // if (!this.props.endDate || time > this.props.endDate){ trip.set({endDate: time}, {merge: true}) }

    this.props.closeForm(null, name, time);
    /*  does not include default empty values for other fields of event */
  }


  handleChange(evt){
    evt.preventDefault();
    this.setState({[evt.target.name]: evt.target.value});
  }

  render() {
    return (
      <div className="add-form">
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s6">
            <input placeholder="Event Name" type="text" name="name" onChange={this.handleChange} />
          </div>
          <label className="flex-row">
            Date:
                <select className="browser-default" value={this.state.month} onChange={this.handleChange} name="month">
                  {months.map((month, idx) => (
                    <option key={idx} value={month}>{month}</option>)) }
                </select>
                <select className="browser-default" value={this.state.day} onChange={this.handleChange} name="day">
                  {days.map((day, idx) => (
                    <option key={idx} value={day}>{day}</option>
                  ))}
                </select>
                <input type="text" name="year" value={this.state.year} onChange={this.handleChange} />
          </label>
          <label className="flex-row">
            Time:
                <select className="browser-default" value={this.state.hour} onChange={this.handleChange} name="hour">
                  {hours.map((hour, idx) => (
                    <option key={idx} value={hour}>{hour}</option>
                  ))}
                </select>
                <select className="browser-default" value={this.state.minute} onChange={this.handleChange} name="minute">
                  {minutes.map((minute, idx) => (
                    <option key={idx} value={minute}>{minute}</option>
                  ))}
                </select>
                <select className="browser-default" value={this.state.ampm} onChange={this.handleChange} name="ampm">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
          </label>
          <input className="btn waves-effect waves-light" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
