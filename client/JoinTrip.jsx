import React from 'react'
import axios from 'axios'

import {auth} from '~/fire'

const JOIN_API = '/api/join'

export default class JoinTrip extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user =>
      user
        ? joinTrip(user)
        : this.props.login()
    )
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  render() {
    return 'Joining trip...'
  }
}

function joinTrip(user) {
  user.getToken().then(token =>
    axios.get(JOIN_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then((info) => {
      // redirect to the trip id which should be returned in info
      console.log(info)
    }, console.error)
}
