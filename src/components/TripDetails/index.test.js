import React from 'react'
import { render } from '@testing-library/react'
import TripDetails from './index'
import {fakeData} from "./fakedata"

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test('Renders the name', () => {
    let { queryByText } = render(<TripDetails data={fakeData} />)
    let name = queryByText(fakeData.name)
    expect(name).toBeInTheDocument()
})

test("Renders the description", () => {
    let { queryByText } = render(<TripDetails data={fakeData} />)
    let description = queryByText(fakeData.description)
    expect(description).toBeInTheDocument()
})

test('Renders the image', () => {
    let { queryByAltText } = render(<TripDetails data={fakeData} />)
    let image = queryByAltText(fakeData.name)
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe(`data:image/jpeg;base64,${fakeData.image}`)
})

test("Renders the city names", () => {
    let { queryByText } = render(<TripDetails data={fakeData} />)
    fakeData.cities.forEach((city) => {
        let name = queryByText(`${city.name} (${fakeData.country.name})`)
        expect(name).toBeInTheDocument()
    })
})

test("Renders the city dates", () => {
    let { queryByText } = render(<TripDetails data={fakeData} />)
    fakeData.cities.forEach((city) => {
        console.log(`From ${(new Date(city.datetime_of_arrival)).toLocaleString()} to ${(new Date(city.datetime_of_departure)).toLocaleString()}`)
        let dates = queryByText(`From ${(new Date(city.datetime_of_arrival)).toLocaleString()} to ${(new Date(city.datetime_of_departure)).toLocaleString()}`)
        expect(dates).toBeInTheDocument()
    })
})

test("Renders the city temperatures", () => {
    let { queryByText } = render(<TripDetails data={fakeData} />)
    fakeData.cities.forEach((city) => {
        console.log(`Temperature: ${(city.temperature_in_kelvin - 273.15).toFixed(0)}°C`)
        let temperature = queryByText(`Temperature: ${(city.temperature_in_kelvin - 273.15).toFixed(0)}°C`)
        expect(temperature).toBeInTheDocument()
    })
})
