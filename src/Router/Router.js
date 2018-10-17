import React, { Component } from 'react';
import Home from '../screens/home';
import MyMap from '../screens/map';
import SetProfile from '../screens/setProfile';
import Dashboard from '../screens/dashboard'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path="/set-profile/:id" component={SetProfile} />
          <Route path="/map" component={MyMap} />
          <Route path="/dashboard/:id" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
