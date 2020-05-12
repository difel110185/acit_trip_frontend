import React, {useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function LoginForm(props) {
    const history = useHistory();

    const initialState = {
        email: undefined,
        password: undefined
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'changeEmail': return {...state, email: action.email};
            case 'changePassword': return {...state, password: action.password};
            default: throw new Error('Unexpected action: ' + action);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Form>
            {props.failedPreviousAttempt && <Alert variant={'danger'}>
                Login attempt failed. Please try again.
            </Alert>}

            <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control as="input" data-testid="email" onChange={(event) => dispatch({type: 'changeEmail', email: event.target.value})}/>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" data-testid="password" onChange={(event) => dispatch({type: 'changePassword', password: event.target.value})}/>
            </Form.Group>

            <Button variant="primary" onClick={() => {
                props.onSubmit(state.email, state.password)
            }}>
                Login
            </Button>
        </Form>
    )
}

export default LoginForm
