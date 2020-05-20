import React, {useReducer, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {getTrips, getTrip, addTrip, editTrip, deleteTrip, getCountries, login, addUser} from "./networkManager";
import TripList from "./components/TripList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import TripDetails from "./components/TripDetails";
import TripAddForm from "./components/TripAddForm";
import TripEditForm from "./components/TripEditForm";
import LoginForm from "./components/LoginForm";
import UserAddForm from "./components/UserAddForm";
import Button from "react-bootstrap/Button";

function App(props) {
    const initialState = {
        loading: false,
        trips: [],
        trip: undefined,
        loggedIn: false,
        failedLogin: false,
        countries: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'login': return {...state, loggedIn: true};
            case 'failLogin': return {...state, failedLogin: true};
            case 'logout': return {...state, loggedIn: false};
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
        if (state.loggedIn) {
            fetchData()

            getCountries()
                .then((response) => {
                    dispatch({type: 'setCountries', countries: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [state.loggedIn])

    if (state.loading)
        return <div>Loading...</div>

    return (
        <Router>
            {state.loggedIn && <Button variant="danger" style={{marginBottom: 20}} onClick={() => {
                dispatch({type: 'logout'})
            }}>Logout</Button>}

            <div>
                <Switch>
                    <Route exact path="/register" render={routeProps => {
                        if (state.loggedIn)
                            return <Redirect to={{pathname: "/trips"}}/>

                        return <div>
                                <Button href={"/"} variant={"secondary"} style={{marginBottom: 20}}>Login</Button>
                                <UserAddForm onSubmit={(user) => {
                                dispatch({type: 'load'})

                                addUser(user).then((response) => {
                                    localStorage.setItem('token', response.data.bearer_token)

                                    dispatch({type: 'login'})
                                }).catch(() => {
                                    dispatch({type: 'failLogin'})
                                }).finally(() => {
                                    dispatch({type: 'loaded'})
                                })
                            }} />
                        </div>
                    }} />
                    <Route exact path="/" render={routeProps => {
                        if (state.loggedIn)
                            return <Redirect to={{pathname: "/trips"}}/>

                        return <div>
                            <Button href={"/register"} variant={"secondary"} style={{marginBottom: 20}}>Register</Button>
                            <LoginForm failedPreviousAttempt={state.failedLogin} onSubmit={(email, password) => {
                                dispatch({type: 'load'})

                                login(email, password).then((response) => {
                                    localStorage.setItem('token', response.data.bearer_token)

                                    dispatch({type: 'login'})
                                }).catch(() => {
                                    dispatch({type: 'failLogin'})
                                }).finally(() => {
                                    dispatch({type: 'loaded'})
                                })
                            }} />
                        </div>
                    }} />
                    <Route exact path="/trips" render={routeProps => {
                        if (!state.loggedIn)
                            return <Redirect to={{pathname: "/"}}/>

                        if (state.trip)
                            dispatch({type: 'unsetTrip'})

                        return <TripList trips={state.trips} onDelete={(id) => {
                            deleteTrip(id).then(() => fetchData())
                        }} />
                    }} />
                    <Route exact path="/trips/add" render={routeProps => {
                        if (!state.loggedIn)
                            return <Redirect to={{pathname: "/"}}/>

                        return <TripAddForm countries={state.countries} onSubmit={(trip) => addTrip(trip).then(() => fetchData())} />
                    }} />
                    <Route exact path="/trips/:id/edit" render={routeProps => {
                        if (!state.loggedIn)
                            return <Redirect to={{pathname: "/"}}/>

                        if (state.trip)
                            return <TripEditForm countries={state.countries} trip={state.trip} onSubmit={(trip) => editTrip(trip).then(() => fetchData())} />

                        fetchTrip(routeProps.match.params.id)
                    }} />
                    <Route path="/trips/:id" render={routeProps => {
                        if (!state.loggedIn)
                            return <Redirect to={{pathname: "/"}}/>

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
