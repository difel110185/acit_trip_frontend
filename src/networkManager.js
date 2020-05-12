import axios from "axios"

export function getTrips() {
    const token = localStorage.getItem('token')

    return axios.get('/trips', { headers: { Authorization: `Bearer ${token}` }});
}

export function getTrip(id) {
    const token = localStorage.getItem('token')

    return axios.get(`/trips/${id}`, { headers: { Authorization: `Bearer ${token}` }});
}

export function getCountries() {
    const token = localStorage.getItem('token')

    return axios.get('/countries', { headers: { Authorization: `Bearer ${token}` }});
}

export function addTrip(trip) {
    const token = localStorage.getItem('token')

    return axios.post('/trips', trip, { headers: { Authorization: `Bearer ${token}` }});
}

export function editTrip(trip) {
    const token = localStorage.getItem('token')

    return axios.put(`/trips/${trip.id}`, trip, { headers: { Authorization: `Bearer ${token}` }});
}

export function deleteTrip(id) {
    const token = localStorage.getItem('token')

    return axios.delete(`/trips/${id}`, { headers: { Authorization: `Bearer ${token}` }});
}

export function login(email, password) {
    return axios.post('/login', {email, password})
}
