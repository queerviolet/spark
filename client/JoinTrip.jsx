import React from 'react'
import axios from 'axios'

import {auth} from '~/fire'

export default class JoinTrip extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user =>
      user
        ? joinTrip(user, this.props.inviteId)
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

function joinTrip(user, inviteId) {
  const JOIN_API = `/api/join/${inviteId}`
  console.log('join api is: ', JOIN_API)
  user.getToken().then(token =>
    axios.get(JOIN_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then((info) => {
      // redirect to the trip id which should be returned in info
      console.log('inside of joinTrip comopnent and got info back from axios ############', info)
    }, console.error)
}
