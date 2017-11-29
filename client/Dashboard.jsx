import React, { Component } from 'react';
import { db } from '../fire';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
        trips: []
    };
  }

  componentDidMount(){
    var tripsRef = db.collection('trips');
    var usersRef = tripsRef.where(`users.${this.props.user.uid}`, '==', true).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({trips: this.state.trips.concat({ [doc.data().name]: doc.id })});
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

  render(){

    var trips = this.state.trips;
    return (
      <div className="user-dashboard" align="center">
        <h1>User Dashboard</h1>
        <div className="user-dashboard content">
          <img className="user-photo" src={this.props.user.photoURL} />
          <h5><strong>Name:</strong> {this.props.user.displayName}</h5>
          <h5><strong>Email:</strong> {this.props.user.email}</h5>
          <h5><ul><strong>My Trips:</strong> </ul></h5>
          {
            trips.map((trip, idx) => {
                return (
                    <h5 key={idx} className="trip-item menu-item">
                        <li><Link to={`/${Object.values(trip)[0]}`}>{Object.keys(trip)[0]}</Link></li>
                    </h5>
                );
            })
        }
        </div>
      </div>
    );
  }
}
