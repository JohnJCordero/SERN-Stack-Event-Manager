import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.register = this.register.bind(this);



        this.state = {
            username: "",
            password: "",
            confirm: ""
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
    onChangeConfirm(e) {
        this.setState({
            confirm: e.target.value
        });
    }


    register() {
        if(this.state.password !== this.state.confirm)
            alert("Passwords do NOT match")


        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        UserDataService.create(data)
            .then(response => {

                window.location.href = "/login"
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
                            <label htmlFor="username">Enter Username</label>
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
                            <label htmlFor="password">Enter Password</label>
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
                        <div className="form-group">
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm"
                                required
                                value={this.state.confirm}
                                onChange={this.onChangeConfirm}
                                name="confirm"
                            />
                        </div>

                        <button onClick={this.register} className="btn btn-success">
                            Register
                        </button>
                    </div>

            </div>
        );
    }
}