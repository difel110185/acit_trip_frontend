import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

function TripListItem(props) {
    return (
        <Card>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${props.data.image}`} alt={props.data.name} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Text>{props.data.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TripListItem
