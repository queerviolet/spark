import React, {Component} from 'react'

export function getCoords(city) {
        var formatted = city.split(' ').join('+')
        fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.json())
        .then((res) => (res.results[0].geometry.location))
        .then((coords) => getActivityTypes(coords))
        //(coords.lat).toString()+","+(coords.lng).toString())
        // .then((parsedCoords) => getActivityTypes(parsedCoords))
       // .then((parsedCoords) => getActivityTypes())
}

export function getActivityTypes(coords) {
        // console.log("WE ARE IN GETACTIVITYTYPES:" , coords)
        var lat = coords.lat
        // console.log("lat", lat)
        var lng = coords.lng
        // console.log('lng', lng)

        // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&rankby=prominence&key=AIzaSyAcMEPVIQJrhI3lacqATvGh50bS6gr-lJI`)
        fetch('https://cors-anywhere.herokuapp.com/'+`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.712775,-74.005973&radius=500&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.json())
        .then((res) => (res.results))
        .then((res) => console.log(res))
        .catch(error => console.log(error))
}