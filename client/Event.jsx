import React from 'react'

import './Event.css'

export default (props) => (
    <div className='Event'>
        <p>{props.data.name}</p>
        <p>{props.data.img}</p>
        <p>{props.data.description}</p>
    </div>
)