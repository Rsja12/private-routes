import React, { Component } from 'react'

import { fakeAuth } from '../containers/App'
import { Redirect } from 'react-router-dom'

export class Login extends Component {

    state = {
        redirectToReferrer: false
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToReferrer: true 
            })
        })
    }

    render() {

        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div>
                <p>You must be logged in to view this page</p>
                <button onClick={this.login}>Click Me</button>
            </div>
        )
    }
}

export default Login
