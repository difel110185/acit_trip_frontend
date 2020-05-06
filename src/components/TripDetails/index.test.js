import React from 'react'
import { render } from '@testing-library/react'
import TripDetails from './index'
import {fakeData} from "./fakedata"

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
        let dates = queryByText(`${(new Date(city.datetime_of_arrival)).toLocaleString()} - ${(new Date(city.datetime_of_departure)).toLocaleString()}`)
        expect(dates).toBeInTheDocument()
    })
})
