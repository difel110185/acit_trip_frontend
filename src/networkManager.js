import axios from "axios"

export function getTrips() {
    return axios.get('/trips');
}

export function getTrip(id) {
    return axios.get(`/trips/${id}`);
}

export function getCountries() {
    return axios.get('/countries');
}

export function addTrip(trip) {
    return axios.post('/trips', trip);
}

export function editTrip(trip) {
    return axios.put(`/trips/${trip.id}`, trip);
}

export function deleteTrip(id) {
    return axios.delete(`/trips/${id}`);
}
