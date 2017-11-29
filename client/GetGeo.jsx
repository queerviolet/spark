import axios from 'axios'
import {googleKey} from '../fire/config'

export function getCoords(city) {
        var formatted = city.split(' ').join('+')
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDkru4DlzkS1qHU--pZk8uhuBh01KOdz0Q`)
        .then((res) => res.data.results[0].geometry.location)
}

export function getActivityTypes(coords, type) {
        var lat = coords.lat
        var lng = coords.lng

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&keyword=${type}&rankby=prominence&key=${googleKey}`)
        .then((res) => res.data.results)
        .then((res) => res.slice(0, 5))
        .catch(error => console.log(error))
}

export function topPlaces(coords) {
        var lat = coords.lat
        var lng = coords.lng

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&rankby=prominence&key=${googleKey}`)
        .then((res) => (res.data.results))
        .then((res) => res.slice(0 , 5))
        .catch(error => console.log(error))
}