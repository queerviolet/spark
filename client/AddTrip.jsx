import React, { Component } from 'react';

export default class AddTrip extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();

    }

    handleChange(evt) {
        evt.preventDefault();
        this.setState({ name: evt.target.value });
        console.log("THIS.PROPS: ", this.props)

    }

    render() {
        return (
            <div className="add trip form">
            <h3>ADDING EVENT</h3>
            <input placeholder="Trip Name" type="text" name="name" onChange={this.handleChange} />
            <input className="btn waves-effect waves-light" type="submit" value="Create Trip" />
            </div>
        )
    }
}