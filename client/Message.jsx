import React from 'react'

export default (props) => {
return(
      <div>
        <p className="sender-field"><strong>{props.data.from}</strong> {props.data.time.toDateString && props.data.time.toDateString()} {props.data.time.toLocaleTimeString && props.data.time.toLocaleTimeString()}</p>
        <p>{props.data.text}</p>
      </div>
)
}
