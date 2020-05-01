import React, {useReducer, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {getTrips, getTrip} from "./networkManager";
import TripList from "./components/TripList";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import TripDetails from "./components/TripDetails";

function App() {
    const initialState = {
        trips: [],
        trip: undefined
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setTrips': return {...state, trips: action.trips};
            case 'setTrip': return {...state, trip: action.trip};
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
    }, [])

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/trips">
                        <TripList trips={state.trips} />
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
