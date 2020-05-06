import axios from "axios"
import {fakeData as trips} from "./components/TripList/fakedata"
import {fakeData as trip} from "./components/TripDetails/fakedata"
import {fakeData as countries} from "./components/TripAddForm/fakedata"

export function getTrips() {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trips});
    });
}

export function getTrip(id) {
    console.log(id)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trip});
    });
}

export function getCountries() {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: countries});
    });
}

export function addTrip(trip) {
    console.log(trip)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc();
    });
}

export function editTrip(trip) {
    console.log(trip)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc();
    });
}
