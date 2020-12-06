
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {Link, Route, Switch} from 'react-router-dom'
import AddEvent from "./components/add-event.component";
import Register from "./components/register";
import Login from './components/login'
import Users from "./components/user"
import Admins from './components/admin'
import Superadmin from "./components/superadmin";

class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/users" className="navbar-brand">
              Event Manager
            </a>
            <div className="navbar-nav ">
              <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                      Event List
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                      Make An Event
                  </Link>
              </li>
                <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                        Admin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/super"} className="nav-link">
                        Super Admin
                    </Link>
                </li>

            </div>

              <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                          Register
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                          Login
                      </Link>
                  </li>
              </div>
          </nav>

          <div className="container mt-3">
            <Switch>

              <Route exact path="/add" component={AddEvent} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/admin" component={Admins} />
              <Route exact path="/super" component={Superadmin} />



            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
