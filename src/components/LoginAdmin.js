import React, { Component } from 'react';
import axios from 'axios';
import { Route, BrowserRouter, Switch, NavLink, Redirect } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import logo from '../images/logoAllsponsored.png';
import '../CSS/LoginClub.css';

class LoginAdmin extends Component {
    state = {
        redirectToReferrer: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("coucou", e.target.email.value, e.target.password.value);
        axios.post("http://localhost:3030/signinadmin", {
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then((res) => {
                localStorage.setItem("token", res.headers["x-access-token"])
                console.log("token", localStorage.getItem("token"));
                console.log(res.status);
                if (res.status == 200) {
                    console.log("Login successfull");
                    this.setState({
                        redirectToReferrer: true
                    })
                }
                else if (res.status == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {
        const { redirectToReferrer } = this.state
        if (redirectToReferrer === true) {
            return <Redirect to='/adminhome' />
        }
        return (
            <div className="contentGlobal">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div>
                    <MuiThemeProvider>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                type="text" name="email" placeholder="email"
                            />
                            <br />
                            <TextField
                                type="password" name="password" placeholder="mot de pass"
                            />
                            <br />
                            <br />
                            <Button variant="contained" color="primary" type="submit">Login</Button>
                        </form>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }


}

export default LoginAdmin;