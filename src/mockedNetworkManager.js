import {fakeData as trips} from "./components/TripList/fakedata"
import {fakeData as trip} from "./components/TripDetails/fakedata"
import {fakeData as countries} from "./components/TripAddForm/fakedata"
import axios from "axios";

export function getTrips() {
    console.log("GET TRIPS")
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trips});
    });
}

export function getTrip(id) {
    console.log("GET TRIP")
    console.log(id)
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trip});
    });
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

export function login(email, password) {
    console.log("LOGIN")
    console.log(email)
    console.log(password)
    return new Promise((resolutionFunc, rejectionFunc) => {
        if (password === "123456")
            resolutionFunc({data: {bearer_token: "ACCESS TOKEN XUXA"}});

        rejectionFunc()
    });
}

export function addUser(user) {
    console.log("ADD USER")
    console.log(user)
    return new Promise((resolutionFunc, rejectionFunc) => {
        if (user.password === "123456")
            resolutionFunc({data: {bearer_token: "ACCESS TOKEN XUXA"}});

        rejectionFunc()
    });
}
