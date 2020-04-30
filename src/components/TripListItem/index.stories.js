import React from 'react'
import TripListItem from './index'
import {fakeData} from "./fakedata";

export default {
    title: 'TripListItem',
    component: TripListItem,
}

export const Default = () => (
    <TripListItem data={fakeData} />
)
