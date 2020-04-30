import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function TripListItem(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${props.data.image}`} alt={props.data.name} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Text>{props.data.description}</Card.Text>
                <Button variant="primary" className="float-right">Details</Button>
            </Card.Body>
        </Card>
    )
}

export default TripListItem
