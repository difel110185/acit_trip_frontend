import axios from "axios"
import {fakeData as countries} from "./components/TripAddForm/fakedata";

export function getTrips() {
    return axios.get('/trips');
}

export function getTrip(id) {
    return axios.get(`/trips/${id}`);
}

export function getCountries() {
    console.log("GET COUNTRIES")
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: countries});
    });
}

export function addTrip(trip) {
    console.log("ADD TRIP")
    console.log(trip)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc();
    });
}

export function editTrip(trip) {
    console.log("EDIT TRIP")
    console.log(trip)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc();
    });
}

export function deleteTrip(id) {
    console.log("DELETE TRIP")
    console.log(id)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc();
    });
}
