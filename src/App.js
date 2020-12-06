
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {Link, Route, Switch} from 'react-router-dom'
import Register from "./components/register";
import Login from './components/login'


class App extends Component {
  render() {
    return (

      <nav style={{padding: "5%"}}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </nav>
        
    );
  }
}

export default App;
