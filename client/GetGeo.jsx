import axios from 'axios'

export function getCoords(city) {
        var formatted = city.split(' ').join('+')
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.data.results[0].geometry.location)
        // .then((coords) => topPlaces(coords))
        // .then((value) => {console.log("VALUE: ",value)
        // return value})
}

export function getActivityTypes(coords, type) {
        var lat = coords.lat
        var lng = coords.lng

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&keyword=${type}&rankby=prominence&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => res.data.results)
        .then((res) => res.slice(0, 5))
        .catch(error => console.log(error))
}

export function topPlaces(coords) {
        var lat = coords.lat
        var lng = coords.lng

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&keyword=establishment,activity&rankby=prominence&key=AIzaSyDfFiJgPk0kIAla_Csuz7wXh7M0cWtb1Yg`)
        .then((res) => (res.data.results))
        .then((res) => res.slice(0 , 5))
        .catch(error => console.log(error))
}

// return trip-name.add({
//         coords:
// })

//'https://cors-anywhere.herokuapp.com/'+
