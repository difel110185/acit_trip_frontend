import React, {useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom";

function UserAddForm(props) {
    const history = useHistory();

    const initialState = {
        name: undefined,
        email: undefined,
        password: undefined
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'changeName': return {...state, name: action.name};
            case 'changeEmail': return {...state, email: action.email};
            case 'changePassword': return {...state, password: action.password};
            default: throw new Error('Unexpected action: ' + action);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Form>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control as="input" data-testid="name" onChange={(event) => dispatch({type: 'changeName', name: event.target.value})}/>
            </Form.Group>

            <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control as="input" data-testid="email" onChange={(event) => dispatch({type: 'changeEmail', email: event.target.value})}/>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" data-testid="password" onChange={(event) => dispatch({type: 'changePassword', password: event.target.value})}/>
            </Form.Group>

            <Button variant="primary" onClick={() => {
                props.onSubmit(state)
            }}>
                Sign Up
            </Button>
        </Form>
    )
}

export default UserAddForm
