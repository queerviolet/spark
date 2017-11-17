import firebase from '~/fire'
import Trip from './client/Trip'

import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import React, { Component } from 'react'

// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory()

const db = firebase.firestore()

export default class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const isLoggedIn = this.props.user // at some point we'll have this or something like it
    console.log('this.props', this.props);
    return (
      <Router>
        {!isLoggedIn ?
          (<Switch>
            <Route exact path="/" component={() => (<h1>HIIII</h1>)} /> {/* their acct dashboard */}
            <Route path="/:tripId" component={Trip} /> {/* an individual trip  */}
            </Switch>)
        : (<Switch>
            <Route exact path="/" component={Home} /> {/* HomePage incl. login */}
          </Switch>)
        }
      </Router>
    );
  }
}


//export default () => <Chat room={db.collection('test-chat')}/>
