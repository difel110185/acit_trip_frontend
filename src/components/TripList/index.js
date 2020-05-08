import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TripListItem from "../TripListItem";
import CardColumns from "react-bootstrap/CardColumns";

function TripList(props) {
    return (
        <CardColumns>
            {(!props.trips || props.trips.length === 0) && <h1>Loading...</h1>}
            {props.trips && props.trips.map((trip) => <TripListItem key={trip.id} data={trip} onDelete={props.onDelete} />)}
        </CardColumns>
    )
}

export default TripList
