import React from 'react';
import {Link} from 'react-router-dom'
// import { db } from '../fire'

//export default class Sidebar extends Component {

export const Sidebar = () => {
    //var tripsRef = db.collection("trips")
    //var queryRef = tripsRef.where("city", "==", "toronto");

    // console.log("QUERYREF: ", queryRef)  

    var trips = ["nyc", "Brazil"]
    return (
        <div>
            <h3>Sidebar</h3>

        <section>
            <h5 className="menu-item">
                <Link to="/account">My Account</Link>
            </h5>
        </section>

        <ul className="list-unstyled">
            <h4>My Trips</h4>
            {
                trips.map(trip => {
                    return (
                        <li key={trip} className="trip-item menu-item">
                            <Link to={`//${trip}`}>{trip}</Link>
                        </li>
                    );
                })
            }
        </ul>

        <section>
            <h5>
                <Link className="add trip" to="/{tripId}">
                    <span className="glyphicon glyphicon-plus"></span> Add Trip
                </Link>
            </h5>
        </section>

        </div>
        );
}


export default Sidebar

   