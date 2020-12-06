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

    onFooterLink(e) {
        window.location.href = "/register"
    }

    login() {
        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        UserDataService.login(data)
            .then(response => {
                if(response.status === (200))
                     window.location.href = "/dashboard"
                this.setState({
                    email: response.data.email,
                    password: response.data.password,
                });
                console.log(response.data);
                localStorage.setItem("username", response.data.email);
            })
            .catch(e => {

                window.location.href = "/login"
                alert("Incorrect email/password.")
            });
    }



    render() {
        return (
            <div style={styles.container}>
            <form styles={{alignSelf: "center", alignItems: "center", justifyContent: "center"}}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        id="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        id="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>

                <button onClick={this.login} type="submit" className="btn btn-primary btn-block">Submit</button>
               
                <p className="text-right">
                    Not yet a user? <a href="/register">Register.</a>
                </p>
                {/* <p className="text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
            </div>
        );
    }
}

const styles = {
    textInput: {
        width: "50%",
        alignSelf:"center"
    },
    container: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: "20px",
        padding: "5%",
        width: "50%"
    }
}