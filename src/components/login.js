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
            password: ""
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

                window.location.href = "/events"
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                });
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
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
                            type="text"
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