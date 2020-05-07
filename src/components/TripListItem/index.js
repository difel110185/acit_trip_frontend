import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

function TripListItem(props) {
    const history = useHistory();

    return (
        <Card>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${props.data.image}`} alt={props.data.name} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Text>{props.data.description}</Card.Text>
                <Button variant="primary" onClick={() => history.push(`/trips/${props.data.id}`)} style={{marginRight: 10}}>Details</Button>
                <Button variant="warning" onClick={() => history.push(`/trips/${props.data.id}/edit`)} style={{marginRight: 10}}>Edit</Button>
                <Button variant="danger" onClick={() => {
                    props.onDelete(props.data.id)
                    history.push(`/trips`)
                }}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default TripListItem
