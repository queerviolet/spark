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
        const sidebarComp = this;
        var usersRef = tripsRef.where(`users.${this.props.userId}`, '==', true)
            .onSnapshot(function (querySnapshot) {
                var trips = [];
                querySnapshot.forEach(function (doc) {
                    trips.push({[doc.data().name]: doc.id});
                });
                sidebarComp.setState({trips})
            });
    }

    render(){
    var trips = this.state.trips;
    return (
        <div className="sidebar">
        <SideNav
            trigger={<Button id="sidebarButton"><i className="material-icons">menu</i></Button>}
            options={{ closeOnClick: true }} >
                {/* used onClick instead of nested Link because browser console complains about nested a tags */}
                <SideNavItem onClick={() => {this.props.history.push('/')}} >My Account</SideNavItem>
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
