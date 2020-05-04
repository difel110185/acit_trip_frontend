import axios from "axios"
import {fakeData as trip} from "./components/TripDetails/fakedata"

export function getTrips() {
    return axios.get('/trips');
}

export function getTrip(id) {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trip});
    });
}
