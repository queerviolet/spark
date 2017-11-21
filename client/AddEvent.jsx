import React, { Component } from 'react';


/*  HELPERS FOR THE OPTIONS BELOW  */
let days = [];
( () => {
  for (var i = 1; i < 32; i++){
    days.push(i);
  }
})();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class AddEvent extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      month: 'January',
      day: '1',
      year: '2017',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    evt.preventDefault();
    this.setState({[evt.target.name]: evt.target.value});
  }

  render() {
    console.log('this state are: ', this.state);
    return (
      <div className="add-form">
        <form>
          <label>
            Name:
                <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
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
          <label>
            Time:
                <input type="text" name="time" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
