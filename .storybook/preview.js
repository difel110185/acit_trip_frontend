import React from 'react'
import { createMemoryHistory } from 'history'
import { Router, Route } from 'react-router-dom'
import {addDecorator} from "@storybook/react";

addDecorator(story => (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path="/" component={() => story()} />
    </Router>
))
