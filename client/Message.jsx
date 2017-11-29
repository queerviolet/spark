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
        <button onClick={() => {console.log(name);props.eventref.add({
          name: name,
          comment: [],
          likes: {counter:0},
          itineraryStatus: false,
          description: '',
          type: 'event'
        })}}>PIN</button>
        {photo? <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${googleKey}`}/> : <img src= 'http://the-joyful-traveler.com/wp-content/uploads/2017/04/Jonufer_vlora_albania_2016-400x200.jpg' />}
        </div>)
      })
    )
  }

    return (
      (
      <div className="talk-bubble">
        <p><strong>{props.from}</strong> {props.time.toDateString && props.time.toDateString()} {props.time.toLocaleTimeString && props.time.toLocaleTimeString()}</p>
        <p>{props.text}</p>
      </div>
      )
    )
}


 // FROM ASHI... IF IT HAS PLACES (FROM GOOGLE PLACES)
