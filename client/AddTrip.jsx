import React, { Component } from 'react';
import firebase, { db } from '../fire'
import { withRouter } from 'react-router'
import { SideNavItem, SideNav, Button, Icon } from 'react-materialize'


export class AddTrip extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
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
            // startDate: new Date(), //(new Date("January 1, 2017 01:15:00")),
            // endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            location: '',
            coords: {}
        })
        .then(({id}) => this.props.history.push(`/${id}`))
        this.setState({ name: '' });
    }

    handleChange(evt) {
        evt.preventDefault();
        this.setState({ 
            name: evt.target.value,
        });
    }

    render() {
        var id = this.state.id
        return (
            <div className="add trip form">
                <form onSubmit={this.handleSubmit}>
                    <input className="placeholder" placeholder="Trip Name" value={this.state.name} type="text" name="name" onChange={this.handleChange} />
                <SideNavItem>
                <input
                className="btn waves-effect waves-light"
                type="submit"
                value="Create Trip"
                />
                
                </SideNavItem>
                </form>

            </div>
        )
    }
}

export default withRouter(AddTrip)
