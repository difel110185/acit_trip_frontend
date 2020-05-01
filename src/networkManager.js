import axios from "axios";
import {fakeData as trips} from "./components/TripList/fakedata"

export function getTrips() {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc({data: trips});
    });
}
