import React from 'react'
import { render } from '@testing-library/react'
import TripListItem from './index'
import {fakeData} from "./fakedata"

test('Renders the name', () => {
    let { queryByText } = render(<TripListItem data={fakeData} />)
    let name = queryByText(fakeData.name)
    expect(name).toBeInTheDocument()
})

test("Renders the description", () => {
    let { queryByText } = render(<TripListItem data={fakeData} />)
    let description = queryByText(fakeData.description)
    expect(description).toBeInTheDocument()
})

test('Renders the image', () => {
    let { queryByAltText } = render(<TripListItem data={fakeData} />)
    let image = queryByAltText(fakeData.name)
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe(`data:image/jpeg;base64,${fakeData.image}`)
})
