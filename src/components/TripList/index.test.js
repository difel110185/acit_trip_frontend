import React from 'react'
import { render } from '@testing-library/react'
import TripList from './index'
import {fakeData} from "./fakedata"

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Renders empty list', () => {
    let { queryByText } = render(<TripList trips={[]} />)
    let title = queryByText("No trips found")
    expect(title).toBeInTheDocument()
})

test('Renders the trips name', () => {
    let { queryByText } = render(<TripList trips={fakeData} />)
    fakeData.forEach((trip) => {
        let name = queryByText(trip.name)
        expect(name).toBeInTheDocument()
    })
})

test("Renders the trips description", () => {
    let { queryByText } = render(<TripList trips={fakeData} />)
    fakeData.forEach((trip) => {
        let description = queryByText(trip.description)
        expect(description).toBeInTheDocument()
    })
})

test('Renders the trips image', () => {
    let { queryByAltText } = render(<TripList trips={fakeData} />)
    fakeData.forEach((trip) => {
        let image = queryByAltText(trip.name)
        expect(image).toBeInTheDocument()
        expect(image.getAttribute('src')).toBe(`data:image/jpeg;base64,${trip.image}`)
    })
})
