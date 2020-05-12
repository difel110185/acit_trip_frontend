import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TripListItem from "../TripListItem";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function TripList(props) {
    const history = useHistory();

    return (
        <div>
            <Button variant="primary" onClick={() => {
                history.push(`/trips/add`)
            }}>
                Add trip
            </Button>
            <CardColumns>
                {(!props.trips || props.trips.length === 0) && <h1>No trips found.</h1>}
                {props.trips && props.trips.map((trip) => <TripListItem key={trip.id} data={trip} onDelete={props.onDelete} />)}
            </CardColumns>
        </div>
    )
}

export default TripList
