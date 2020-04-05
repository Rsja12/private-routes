import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import Public from '../components/Public'
import Login from '../components/Login'
import Private from '../components/Private'
import Secret from '../components/Secret'

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async 
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ (props) => (
        fakeAuth.isAuthenticated === true ? 
        <Component {...props} /> 
        : <Redirect to={{
            // allows us to redirect user to page they wanted to go to once they are authenticated
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

export class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/public">Public</Link></li>
                        <li><Link to="/private">Private</Link></li>
                        <li><Link to="/secret">Secret</Link></li>
                    </ul>

                    <Route path="/public" component={Public} />

                    <Route path="/login" component={Login} />

                    <PrivateRoute path="/private" component={Private} />
                    <PrivateRoute path="/secret" component={Secret} />
                </div>
            </Router>
        )
    }
}

export default App
