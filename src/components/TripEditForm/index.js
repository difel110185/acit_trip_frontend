import React, {useEffect, useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import bsCustomFileInput from 'bs-custom-file-input'
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";

function TripEditForm(props) {
    const history = useHistory();

    const initialState = {
        name: props.trip.name,
        description: props.trip.description,
        image: props.trip.image,
        country_id: props.trip.country.id,
        cities: props.trip.cities
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'changeName': return {...state, name: action.name};
            case 'changeDescription': return {...state, description: action.description};
            case 'changeCountryId': return {...state, country_id: action.country_id};
            case 'changeImage': return {...state, image: action.image};
            case 'addCity': return {...state, cities: [...state.cities, action.city]};
            case 'removeCity': return {...state, cities: state.cities.filter((city) => !action.cityKeys.includes(city.name) )};
            default: throw new Error('Unexpected action: ' + action);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        bsCustomFileInput.init()
    }, [])

    return (
        <Form>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control as="input" data-testid="name" onChange={(event) => dispatch({type: 'changeName', name: event.target.value})} value={state.name}/>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" data-testid="description" onChange={(event) => dispatch({type: 'changeDescription', description: event.target.value})} value={state.description}/>
            </Form.Group>

            <Form.Group controlId="country_id">
                <Form.Label>Country</Form.Label>
                <Form.Control as="select" data-testid="country_id" onChange={(event) => dispatch({type: 'changeCountryId', country_id: event.target.value})} value={state.country_id}>
                    <option></option>
                    {props.countries.map((country) => {
                        return <option key={country.id} value={country.id}>{country.name}</option>
                    })}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <div className="custom-file">
                    <input id="imageFile" type="file" className="custom-file-input" data-testid="image" onChange={() => {
                        const file = document.querySelector('#imageFile').files[0];
                        const reader = new FileReader();

                        reader.addEventListener("load", () => dispatch({type: 'changeImage', image: reader.result.slice(reader.result.indexOf(',')+1)}), false);

                        if (file)
                            reader.readAsDataURL(file);
                    }} />
                    <label className="custom-file-label" htmlFor="imageFile">Choose file</label>
                </div>
                {state.image && <Image src={`data:image/jpeg;base64,${state.image}`} alt={state.name} rounded width={200} />}
            </Form.Group>

            <Form.Group controlId="cities">
                <Form.Label>Cities</Form.Label>
                <BootstrapTable data={ state.cities } insertRow={ true } deleteRow={ true } selectRow={{mode: 'checkbox'}} options={{
                    insertModalHeader: (onClose, onSave) => {
                        return (
                            <div className='modal-header' style={{
                                fontWeight: 'bold',
                                fontSize: 'large',
                                textAlign: 'center',
                                backgroundColor: '#eeeeee'
                            }}>
                                <h3>Add city</h3>
                                <button className='btn btn-info' onClick={ onClose }>X</button>
                            </div>
                        );
                    },
                    insertBtn: () => <InsertButton btnText='Add' btnContextual='btn-success'/>,
                    afterInsertRow: (row) => dispatch({type: 'addCity', city: row}),
                    deleteBtn: () => <DeleteButton btnText='Delete' btnContextual='btn-danger' />,
                    afterDeleteRow: (rowKeys) => dispatch({type: 'removeCity', cityKeys: rowKeys})
                }}>
                    <TableHeaderColumn dataField='name' isKey={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='datetime_of_arrival' customInsertEditor={{
                        getElement: (column, attr, editorClass, ignoreEditable) => {
                            return (
                                <div>
                                    <input className={ `${editorClass}` } { ...attr } />
                                    <em>Format: 2021-01-01 18:30</em>
                                </div>
                                )
                        }
                    }}>Date and time of arrival</TableHeaderColumn>
                    <TableHeaderColumn dataField='datetime_of_departure' customInsertEditor={{
                        getElement: (column, attr, editorClass, ignoreEditable) => {
                            return (
                                <div>
                                    <input className={ `${editorClass}` } { ...attr } />
                                    <em>Format: 2021-01-01 18:30</em>
                                </div>
                            )
                        }
                    }}>Date and time of departure</TableHeaderColumn>
                </BootstrapTable>
            </Form.Group>

            <Button variant="primary" style={{marginRight: 10}} onClick={() => {
                props.onSubmit(state)
                history.push(`/trips`)
            }}>
                Update trip
            </Button>

            <Button variant="danger" onClick={() => {
                history.push(`/trips`)
            }}>
                Cancel
            </Button>
        </Form>
    )
}

export default TripEditForm
