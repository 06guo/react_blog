import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main () {
    return (
        <Router>
            <Route path="/" exact component={Login}/>
            <Route path="/index/" component={AdminIndex}/>
        </Router>
    )
}
export default Main