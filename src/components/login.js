import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);



        this.state = {
            username: "",
            password: "",
            status:"1"
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }



    login() {
        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        UserDataService.login(data)
            .then(response => {


                    console.log(response.data);
                    localStorage.setItem("userid", response.data.id);
                    localStorage.setItem("access", response.data.access)
                    window.location.href = "/users"

            })
            .catch(e => {

                window.location.href = "/login"
                alert("Incorrect username/password.")
            });
    }



    render() {
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            name="password"
                        />
                    </div>


                    <button onClick={this.login} className="btn btn-success">
                        Login
                    </button>
                </div>

            </div>
        );
    }
}