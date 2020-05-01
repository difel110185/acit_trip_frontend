import React from 'react'
import TripDetails from './index'
import {fakeData} from "./fakedata";

export default {
    title: 'TripDetails',
    component: TripDetails,
}

export const Default = () => (
    <TripDetails data={fakeData} />
)
