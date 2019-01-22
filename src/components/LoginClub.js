import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import logo from '../images/logoAllsponsored.png';
import '../CSS/LoginClub.css';
class LoginClub extends Component {
    state = {
        redirectToReferrer: false,
        clubId: undefined
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("coucou", e.target.email.value, e.target.password.value);
        axios.post("http://localhost:3030/signinclub", {
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then((res) => {
                const club_Id = res.data.clubId;
                localStorage.setItem("token", res.headers["x-access-token"])
                localStorage.setItem("clubId", club_Id);
                console.log("token", localStorage.getItem("token"));
                console.log(res.status);
                if (res.status === 200) {
                    console.log("Login successfull");
                    this.setState({
                        redirectToReferrer: true,
                        clubId: club_Id
                    })
                }
                else if (res.status === 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
            }
            )
            .catch(function (error) {
                console.log("Username does not exists");
                alert("Username does not exist");
            })

    }
    render() {
        const { redirectToReferrer, clubId } = this.state
        if (redirectToReferrer === true) {
            return <Redirect to={`/club-list/${clubId}`} />
        }
        return (
            <div className="contentGlobal">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header> <br />
                <div>
                    <MuiThemeProvider>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                type="text" name="email" placeholder="email"
                            />
                            <br />
                            <TextField
                                type="password" name="password" placeholder="mot de passe"
                            />
                            <br />
                            <br />
                            <Button variant="contained" color="primary" type="submit">Login</Button>
                        </form>
                    </MuiThemeProvider>
                </div>
                <br/>
                <div>
                    <Link to={`/MDP`}>Mot de passe oublié ?</Link>
                </div>
            </div>
        )
    }


}

export default LoginClub;