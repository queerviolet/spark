import React, {Component} from 'react'

export function getCoords(city) {
        var formatted = city.split(' ').join('+')
        fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.json())
        .then((res) => (res.results[0].geometry.location))
        .then((coords) => topPlaces(coords))
        // .then((value) => {console.log("VALUE: ",value)
        // return value})

}

export function topPlaces(coords) {
        var lat = coords.lat
        var lng = coords.lng

        fetch('https://cors-anywhere.herokuapp.com/'+`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant&rankby=prominence&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)        
        .then((res) => res.json())
        .then((res) => (res.results))
        .then((res) => console.log(res))
        .catch(error => console.log(error))
}

export function getActivityTypes(coords) {
        var lat = coords.lat
        var lng = coords.lng

        fetch('https://cors-anywhere.herokuapp.com/'+`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&rankby=prominence&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)        
        .then((res) => res.json())
        .then((res) => (res.results))
        .then((res) => console.log(res))
        .catch(error => console.log(error))
}
