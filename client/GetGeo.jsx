import React, {Component} from 'react'

export function getCoords(city) {
        var formatted = city.split(' ').join('+')
        fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.json())
        .then((res) => (res.results[0].geometry.location))
        .then((coords) => console.log(coords))
}
