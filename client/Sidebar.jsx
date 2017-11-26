import React from 'react';
import {Link} from 'react-router-dom'


//export default class Sidebar extends Component {

export const Sidebar = () => {
    var tripsRef = db.collection("trips")
    console.log(tripsRef)
      
        return (
            <sidebar>
                <section>
                    <h4 className="menu-item">
                    <h4>in sidebar</h4>
                        <Link to="/account">My Account</Link>
                    </h4>
                </section>
                <section>
                    <h4 className="text-muted">Trips</h4>
                    <h4>
                        <Link className="btn btn-primary btn-block" to="/new-trip">
                            <span className="glyphicon glyphicon-plus"></span> Trip
                        </Link>
                    </h4>
                </section>
            </sidebar>
        );
    }


export default Sidebar
