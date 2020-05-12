import React from 'react'
import { render } from '@testing-library/react'
import UserAddForm from './index'

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Renders the name label', () => {
    let { queryByLabelText } = render(<UserAddForm />)
    let label = queryByLabelText("Name")
    expect(label).toBeInTheDocument()
})

test('Renders the name input', () => {
    let { queryByTestId } = render(<UserAddForm />)
    let input = queryByTestId("name")
    expect(input).toBeInTheDocument()
})

test('Renders the email label', () => {
    let { queryByLabelText } = render(<UserAddForm />)
    let label = queryByLabelText("Email")
    expect(label).toBeInTheDocument()
})

test('Renders the email input', () => {
    let { queryByTestId } = render(<UserAddForm />)
    let input = queryByTestId("email")
    expect(input).toBeInTheDocument()
})

test('Renders the password label', () => {
    let { queryByLabelText } = render(<UserAddForm />)
    let label = queryByLabelText("Password")
    expect(label).toBeInTheDocument()
})

test('Renders the password input', () => {
    let { queryByTestId } = render(<UserAddForm />)
    let input = queryByTestId("password")
    expect(input).toBeInTheDocument()
})
