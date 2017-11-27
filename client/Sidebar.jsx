import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { db } from '../fire';
import { SideNavItem, SideNav, Button, Icon } from 'react-materialize'
import { withRouter } from 'react-router'
import AddTrip from './AddTrip'
// import { SideNavItem, Nav, NavIcon, NavText } from 'react-sidenav';


//export default class Sidebar extends Component {

export class Sidebar extends Component {

    constructor() {
        super()
        this.state = {
            trips: []
        }
    }

    componentDidMount(){
        var tripsRef = db.collection("trips")
        var usersRef = tripsRef.where(`users.${this.props.userId}`, '==', true).get()
            .then(snapshot => {

                snapshot.forEach(doc => {
                    this.setState({trips: this.state.trips.concat({ [doc.data().name]: doc.id })})
                    // console.log("HERE: ", doc.id, '=>', doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    render(){
    var trips = this.state.trips;
    // console.log('sidebar has props...', this.props);
    return (
        <div className="sidebar">
        <SideNav
                trigger={<Button id="sidebarButton"><i className="material-icons">menu</i></Button>}
            options={{ closeOnClick: true }}
        >
                <SideNavItem href="/">My Account</SideNavItem>
                <button onClick={() => {this.props.logout(); this.props.history.push('/')}}>Log Out</button>
                <SideNavItem divider />
                <SideNavItem subheader>My Trips</SideNavItem>
                {
                    trips.map(trip => {
                        return (
                            <h5 key={Object.values(trip)[0]} className="trip-item menu-item">
                                <Link to={`/${Object.values(trip)[0]}`}>{Object.keys(trip)[0]}</Link>
                            </h5>
                        );
                    })
                }
                <SideNavItem divider />
                <SideNavItem href="/newTrip">+ Add Trip</SideNavItem>
                <AddTrip />
        </SideNav>
        </div>
        );
    }
}

export default withRouter(Sidebar);
