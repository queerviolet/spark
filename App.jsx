import Trip from './client/Trip'

import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import React, { Component } from 'react'
import { HomePage, Dashboard} from './client'
import firebase, { auth, provider, db } from '~/fire'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = { user: null }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({ user }) // things we want off this... email, displayName, photoURL, uid
        db.collection('users').doc(user.uid).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }, { merge: true });
      })
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({user: null})
      })
  }

  render(){
    const isLoggedIn = this.state.user;
    console.log(this.state.user);
    return (
      <Router>
        {isLoggedIn ?
          (<Switch>
            <Route exact path="/" render={() => <Dashboard logout={this.logout} />} /> {/* their acct dashboard */}
            <Route path="/:tripId" component={Trip} /> {/* an individual trip  */}
            </Switch>)
        : (<Switch>
            <Route exact path="/" render={() => <HomePage login={this.login} />} /> {/* HomePage incl. login */}
          </Switch>)
        }
      </Router>
    );
  }
}
