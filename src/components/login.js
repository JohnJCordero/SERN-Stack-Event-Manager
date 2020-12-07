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
                if(response.status === (200))
                     window.location.href = "/add"
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                });
                console.log(response.data);
                localStorage.setItem("username", response.data.username);
            })
            .catch(e => {

                window.location.href = "/login"
                alert("Incorrect username/password.")
            });
    }



    render() {
        return (

            <div style={styles.container}>
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
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
                        placeholder="Enter password" 
                        id="password"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        name="password"
                    />
                </div>

                <button onClick={this.login} type="submit" className="btn btn-primary btn-block">Submit</button>
               
                <p className="text-right">
                    Not yet a user? <a href="/register">Register.</a>
                </p>

            </form>
            </div>
            // <div className="submit-form">
            //     <div>
            //         <div className="form-group">
            //             <label htmlFor="username">Username</label>
            //             <input
            //                 type="text"
            //                 className="form-control"
            //                 id="username"
            //                 required
            //                 value={this.state.username}
            //                 onChange={this.onChangeUsername}
            //                 name="username"
            //             />
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="password">Password</label>
            //             <input
            //                 type="text"
            //                 className="form-control"
            //                 id="password"
            //                 required
            //                 value={this.state.password}
            //                 onChange={this.onChangePassword}
            //                 name="password"
            //             />
            //         </div>


            //         <button onClick={this.login} className="btn btn-success">
            //             Login
            //         </button>
            //     </div>

            // </div>
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