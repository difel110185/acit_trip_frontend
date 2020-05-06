import React from 'react'
import TripEditForm from "./index";
import {fakeData} from "./fakedata"

export default {
    title: 'TripEditForm',
    component: TripEditForm,
}

export const Default = () => (
    <TripEditForm countries={fakeData.countries} trip={fakeData.trip} />
)
