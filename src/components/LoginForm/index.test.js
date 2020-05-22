import React from 'react'
import { render } from '@testing-library/react'
import LoginForm from './index'

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Renders fail message', () => {
    let { queryByText } = render(<LoginForm failedPreviousAttempt={true} />)
    let message = queryByText("Login attempt failed. Please try again.")
    expect(message).toBeInTheDocument()
})

test('Renders the email label', () => {
    let { queryByLabelText } = render(<LoginForm />)
    let label = queryByLabelText("Email")
    expect(label).toBeInTheDocument()
})

test('Renders the email input', () => {
    let { queryByTestId } = render(<LoginForm />)
    let input = queryByTestId("email")
    expect(input).toBeInTheDocument()
})

test('Renders the password label', () => {
    let { queryByLabelText } = render(<LoginForm />)
    let label = queryByLabelText("Password")
    expect(label).toBeInTheDocument()
})

test('Renders the password input', () => {
    let { queryByTestId } = render(<LoginForm />)
    let input = queryByTestId("password")
    expect(input).toBeInTheDocument()
})
