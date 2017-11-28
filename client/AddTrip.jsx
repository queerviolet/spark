import React, { Component } from 'react';
import firebase, { db } from '../fire'
import { withRouter } from 'react-router'

export class AddTrip extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        // const now = (new Date()).toDateString()
        // console.log("NOW ", now, "NEW  ", new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleSubmit(evt) {
        evt.preventDefault();
        const ref = db.collection('trips')
        .add({
            name: this.state.name,
            users: {
                [this.props.userid]: true
            },
            startDate: new Date(), //(new Date("January 1, 2017 01:15:00")),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            location: '',
            coords: {}
        })
        .then(({id}) => this.props.history.push(`/${id}`))
    }

    handleChange(evt) {
        evt.preventDefault();
        this.setState({ name: evt.target.value });
    }

    render() {
        var id = this.state.id
        return (
            <div className="add trip form">
                <form onSubmit={this.handleSubmit}>
                <input placeholder="Trip Name" type="text" name="name" onChange={this.handleChange} />
                <input
                className="btn waves-effect waves-light"
                type="submit"
                value="Create Trip"
                />
                </form>
            </div>
        )
    }
}

export default withRouter(AddTrip)
