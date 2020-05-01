import React, {useReducer, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {getTrips} from "./networkManager";
import TripList from "./components/TripList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TripDetails from "./components/TripDetails";

function App() {
    const initialState = {
        trips: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setTrips': return {...state, trips: action.trips};
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
                <ul>
                    <li>
                        <Link to="/trips">Trips</Link>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/trips">
                        <TripList trips={state.trips} />
                    </Route>
                    <Route path="/trips/:id">
                        <TripDetails />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
