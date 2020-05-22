import React from 'react';
import Image from "react-bootstrap/Image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";


function TripDetails(props) {
    const history = useHistory();


    if (!props.data)
        return <div>Loading...</div>

    return (
        <div>
            <h1>{props.data.name}</h1>
            <Image src={`data:image/jpeg;base64,${props.data.image}`} alt={props.data.name} width={300} />
            <p><b>Description: </b>{props.data.description}</p>
            <p><b>Currency Rate 1 CAD to Local:</b> {props.data.currency}</p>
            

            {props.data.cities.length > 0 &&
                <div>
                    <h2>Cities</h2>
                    <Accordion>
                        {props.data.cities.map((city) => {
                            return (
                                <Card key={city.id}>
                                    <Accordion.Toggle as={Card.Header} eventKey={city.id}>
                                        {city.name} ({  props.data.country.name})
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={city.id}>
                                        <Card.Body>
                                            <div>
                                                <p><b>Time:</b> From {(new Date(city.datetime_of_arrival)).toLocaleString()} to {(new Date(city.datetime_of_departure)).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p><b>Temperature:</b> {(city.temperature_in_kelvin - 273.15).toFixed(0)}°C ({city.temp_desc})</p>
                                            </div>
                                            <div>
                                                <p><b>Local Restaurant</b></p>
                                                <p><b>Name: </b>{city.yelpname} </p>
                                                <p><b>Location: </b>{city.location} </p>
                                                <p><b>Phone: </b>{city.phone} </p>
                                                <p><b>Price: </b>{city.price} </p>
                                                <p><b>Rating: </b>{city.rating} </p>
                                                <p><b>Link: </b>{city.url} </p>
                                            </div>
                                            
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>
                </div>
            }

            <Button variant="danger" style={{marginTop: 20}} onClick={() => {
                history.push(`/trips`)
            }}>
                Back
            </Button>
        </div>
    )
}


export default TripDetails 
