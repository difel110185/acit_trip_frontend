import {fakeData as trips} from "./components/TripList/fakedata"
import {fakeData as trip} from "./components/TripDetails/fakedata"

export function getTrips() {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trips});
    });
}

export function getTrip(id) {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trip});
    });
}
