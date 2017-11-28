import React from 'react'

export default (props) => {
  const splitText = props.data.text.split("*")
  if (props.data.places) {
    return <pre>{JSON.stringify(props.data.places, 0, 2)}</pre>
  } // FROM ASHI... IF IT HAS PLACES (FROM GOOGLE PLACES)
  return (
    props.data.from === 'Your buddy Bot' && splitText.length > 1?
      (
      <div>
        <p className="sender-field"><strong>{props.data.from}</strong> {props.data.time.toDateString && props.data.time.toDateString()} {props.data.time.toLocaleTimeString && props.data.time.toLocaleTimeString()}</p>
        {splitText.map((element, index) => {
          return (
            <div key={index}>
            <p>{element}{index !== 0 && <button onClick={() => props.addPin({
              name: element,
              comment: [],
              likes: {counter:0},
              itineraryStatus: false,
              description: '',
              type: 'event'
            })}>PIN</button>}</p>
            {index !==0 && <img src='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAOwjuA2IoZHb9SdgIvNvYxEN--cvzV2-Y3R4mPs0modJaz4n1gY6n2Ngc9bG927NSSrYh8Hv0APDrC_EYf8m1Bg7cO8jqqE4ra_5UJunUMkhlynnhp2yAyK6RGShGFth7EhDNCP2KQPX8ae1BTlCDYtX6GhRaDhJ-4cU9IvKroOO7rZObX2ihOg&key=AIzaSyDkru4DlzkS1qHU--pZk8uhuBh01KOdz0Q'/> }
            </div>)
        })
        }
      </div>
      ):
      (
      <div>
        <p className="sender-field"><strong>{props.data.from}</strong> {props.data.time.toDateString && props.data.time.toDateString()} {props.data.time.toLocaleTimeString && props.data.time.toLocaleTimeString()}</p>
        <p>{props.data.text}</p>
      </div>
      )
)}
