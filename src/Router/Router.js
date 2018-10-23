import React, { Component } from 'react';
import Home from '../screens/home';
import SetProfile from '../screens/setProfile';
import Dashboard from '../screens/dashboard'
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path="/set-profile/:id" component={SetProfile} />
          <Route path="/dashboard/:id" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
