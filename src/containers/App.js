import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import Public from '../components/Public'
import Login from '../components/Login'
import Private from '../components/Private'

const fakeAuth = {
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
        fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="login" />
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
                    </ul>

                    <Route path="/public" component={Public} />

                    <Route path="/login" component={Login} />

                    <PrivateRoute path="/private" component={Private} />
                </div>
            </Router>
        )
    }
}

export default App
