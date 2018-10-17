import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Routers from './Router/Router';
import './bootstrap.min.css'

class App extends Component {
  constructor(props){
    super(props)
  }



  render() {
    return (
     <Routers />
    );
  }
}

export default App;
