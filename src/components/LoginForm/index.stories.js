import React from 'react'
import LoginForm from "./index";

export default {
    title: 'LoginForm',
    component: LoginForm,
}

export const Default = () => (
    <LoginForm />
)

export const FailedPreviousAttempt = () => (
    <LoginForm failedPreviousAttempt={true} />
)
