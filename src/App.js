import React, {useReducer, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {getTrips, getTrip, addTrip, editTrip, deleteTrip, getCountries} from "./networkManager";
import TripList from "./components/TripList";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import TripDetails from "./components/TripDetails";
import TripAddForm from "./components/TripAddForm";
import TripEditForm from "./components/TripEditForm";

function App(props) {
    const initialState = {
        loading: true,
        trips: [],
        trip: undefined,
        countries: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'load': return {...state, loading: true};
            case 'loaded': return {...state, loading: false};
            case 'setTrips': return {...state, trips: action.trips};
            case 'setTrip': return {...state, trip: action.trip};
            case 'unsetTrip': return {...state, trip: undefined};
            case 'setCountries': return {...state, countries: action.countries};
            default: throw new Error('Unexpected action: ' + action);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = () => {
        dispatch({type: 'load'})

        getTrips()
            .then((response) => {
                dispatch({type: 'setTrips', trips: response.data})
                dispatch({type: 'unsetTrip'})
                dispatch({type: 'loaded'})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchTrip = (id) => {
        getTrip(id)
            .then((response) => {
                dispatch({type: 'setTrip', trip: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData()

        getCountries()
            .then((response) => {
                dispatch({type: 'setCountries', countries: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    if (state.loading)
        return <div>Loading...</div>

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/trips" render={routeProps => {
                        if (state.trip)
                            dispatch({type: 'unsetTrip'})

                        return <TripList trips={state.trips} onDelete={(id) => {
                            deleteTrip(id).then(() => fetchData())
                        }} />
                    }} />
                    <Route exact path="/trips/add">
                        <TripAddForm countries={state.countries} onSubmit={(trip) => addTrip(trip).then(() => fetchData())} />
                    </Route>
                    <Route exact path="/trips/:id/edit" render={routeProps => {
                        if (state.trip)
                            return <TripEditForm countries={state.countries} trip={state.trip} onSubmit={(trip) => editTrip(trip).then(() => fetchData())} />

                        fetchTrip(routeProps.match.params.id)
                    }} />
                    <Route path="/trips/:id" render={routeProps => {
                        if (state.trip)
                            return <TripDetails data={state.trip} />

                        fetchTrip(routeProps.match.params.id)
                    }} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
