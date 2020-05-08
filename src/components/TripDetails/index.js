import React from 'react'
import Image from "react-bootstrap/Image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function TripDetails(props) {
    return (
        <div>
            <h1>{props.data.name}</h1>
            <Image src={`data:image/jpeg;base64,${props.data.image}`} alt={props.data.name} width={300} />
            <p>{props.data.description}</p>

            {props.data.cities.length > 0 &&
                <div>
                    <h2>Cities</h2>
                    <Accordion>
                        {props.data.cities.map((city) => {
                            return (
                                <Card key={city.id}>
                                    <Accordion.Toggle as={Card.Header} eventKey={city.id}>
                                        {city.name} ({props.data.country.name})
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={city.id}>
                                        <Card.Body>
                                            {(new Date(city.datetime_of_arrival)).toLocaleString()} - {(new Date(city.datetime_of_departure)).toLocaleString()}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>
                </div>
            }
        </div>
    )
}

export default TripDetails
