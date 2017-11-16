import React from 'react'

export default (props) => (
  <div>
    <p>{props.data.from}</p>
    <p>{props.data.text}</p>
    <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
    <p>time {props.data.time.toLocaleTimeString && props.data.time.toLocaleTimeString()}</p>
  </div>
)
