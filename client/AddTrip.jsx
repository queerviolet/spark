import React, { Component } from 'react';
import { db } from '../fire'

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
        const ref = db.collection('trips').doc()
        console.log("REF.ID: ", ref.id)
        const { name } = ref.firestore.constructor
        ref.set({ name: this.state.name })
        console.log("SMBMIT state", this.state)
        console.log("THIS.PROPS: ", this.props)

    }

    handleChange(evt) {
        evt.preventDefault();
        this.setState({ name: evt.target.value });
        //console.log("THIS.PROPS: ", this.props)

    }

    render() {
        return (
            <div className="add trip form">
            <h3>ADDING EVENT</h3>
            <form onSubmit={this.handleSubmit}>

            <input placeholder="Trip Name" type="text" name="name" onChange={this.handleChange} />
            <a href="hi">
            <input className="btn waves-effect waves-light" type="submit" value="Create Trip" />
            </a>
            </form>
            </div>
        )
    }
}