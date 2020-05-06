import React from 'react'
import TripAddForm from "./index";
import {fakeData as countries} from "./fakedata"

export default {
    title: 'TripAddForm',
    component: TripAddForm,
}

export const Default = () => (
    <TripAddForm countries={countries} />
)
