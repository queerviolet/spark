import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'

import {auth} from '~/fire'

export class JoinTrip extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user =>
      user
        ? joinTrip(user, this.props.inviteId, this.props)
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

export default withRouter(JoinTrip)

function joinTrip(user, inviteId, props) {
  const JOIN_API = `/api/join/${inviteId}`
  user.getToken().then(token =>
    axios.get(JOIN_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    .then((info) => {
      return props.history.push(`/${info.data.tripId}`)
    }, console.error)
}
