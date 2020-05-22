import React from 'react'
import { render } from '@testing-library/react'
import TripAddForm from './index'
import {fakeData as countries} from "./fakedata"

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Renders the name label', () => {
    let { queryByLabelText } = render(<TripAddForm countries={countries}/>)
    let label = queryByLabelText("Name")
    expect(label).toBeInTheDocument()
})

test('Renders the name input', () => {
    let { queryByTestId } = render(<TripAddForm countries={countries} />)
    let input = queryByTestId("name")
    expect(input).toBeInTheDocument()
})

test('Renders the description label', () => {
    let { queryByLabelText } = render(<TripAddForm countries={countries} />)
    let label = queryByLabelText("Description")
    expect(label).toBeInTheDocument()
})

test('Renders the description input', () => {
    let { queryByTestId } = render(<TripAddForm countries={countries} />)
    let input = queryByTestId("description")
    expect(input).toBeInTheDocument()
})

test('Renders the country label', () => {
    let { queryByLabelText } = render(<TripAddForm countries={countries} />)
    let label = queryByLabelText("Country")
    expect(label).toBeInTheDocument()
})

test('Renders the country input', () => {
    let { queryByTestId } = render(<TripAddForm countries={countries} />)
    let input = queryByTestId("country_id")
    expect(input).toBeInTheDocument()
})

test('Renders all countries', () => {
    let { queryByText } = render(<TripAddForm countries={countries} />)
    countries.forEach((country) => {
        let name = queryByText(country.name)
        expect(name).toBeInTheDocument()
    })
})

test('Renders the image label', () => {
    let { queryByText } = render(<TripAddForm countries={countries} />)
    let label = queryByText("Image")
    expect(label).toBeInTheDocument()
})

test('Renders the image inner label', () => {
    let { queryByLabelText } = render(<TripAddForm countries={countries} />)
    let label = queryByLabelText("Choose file")
    expect(label).toBeInTheDocument()
})

test('Renders the image input', () => {
    let { queryByTestId } = render(<TripAddForm countries={countries} />)
    let input = queryByTestId("image")
    expect(input).toBeInTheDocument()
})

test('Renders the cities label', () => {
    let { queryByLabelText } = render(<TripAddForm countries={countries} />)
    let label = queryByLabelText("Choose file")
    expect(label).toBeInTheDocument()
})
