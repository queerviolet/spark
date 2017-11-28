import React from 'react';
import {googleKey} from '../fire/config'

export default (props) => {

  if (props.places) {
    return (
      props.places.map(({name, rating, photos}) => {
        const photo = photos? photos[0].photo_reference : '';
       return( <div>
        <p>{name}</p>
        <p>{rating || ''}</p>
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${googleKey}`}/>
        </div>)
      })
    )
  }
  return (
      (
      <div>
        <p className="sender-field"><strong>{props.from}</strong> {props.time.toDateString && props.time.toDateString()} {props.time.toLocaleTimeString && props.time.toLocaleTimeString()}</p>
        <p>{props.text}</p>
      </div>
      )
)}


 // FROM ASHI... IF IT HAS PLACES (FROM GOOGLE PLACES)