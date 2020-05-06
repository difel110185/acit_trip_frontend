import React, {useReducer, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {getTrips, getTrip, addTrip, getCountries} from "./mockedNetworkManager";
import TripList from "./components/TripList";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import TripDetails from "./components/TripDetails";
import TripAddForm from "./components/TripAddForm";

function App() {
    const initialState = {
        trips: [],
        trip: undefined,
        countries: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setTrips': return {...state, trips: action.trips};
            case 'setTrip': return {...state, trip: action.trip};
            case 'setCountries': return {...state, countries: action.countries};
            default: throw new Error('Unexpected action: ' + action);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getTrips()
            .then((response) => {
                dispatch({type: 'setTrips', trips: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        getCountries()
            .then((response) => {
                dispatch({type: 'setCountries', countries: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/trips">
                        <TripList trips={state.trips} />
                    </Route>
                    <Route exact path="/trips/add">
                        <TripAddForm countries={state.countries} onSubmit={(trip) => addTrip(trip)} />
                    </Route>
                    <Route path="/trips/:id" render={routeProps => {
                        if (state.trip)
                            return <TripDetails data={state.trip} />

                        getTrip(routeProps.match.params.id)
                            .then((response) => {
                                dispatch({type: 'setTrip', trip: response.data})
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }}>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
