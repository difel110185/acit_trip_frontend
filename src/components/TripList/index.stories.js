import React from 'react'
import TripList from './index'
import {fakeData} from "./fakedata";

export default {
    title: 'TripList',
    component: TripList,
}

export const Default = () => (
    <TripList trips={fakeData} />
)
