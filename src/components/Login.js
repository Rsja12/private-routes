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
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (redirectToReferrer === true) {
            return (
                <Redirect to={ from } />
            )
        }

        return (
            <div>
                <p>You must be logged in to view this page</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

export default Login
