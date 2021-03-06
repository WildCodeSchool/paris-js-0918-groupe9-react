import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import logo from "../images/logoAllsponsored.png";
import "../CSS/LoginClub.css";

class LoginAdmin extends Component {
  state = {
    redirectToReferrer: false
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/signinadmin", {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then(res => {
        localStorage.setItem("token", res.headers["x-access-token"]);
        if (res.status === 200) {
          console.log("Login successfull");
          this.setState({
            redirectToReferrer: true
          });
        } else if (res.status === 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to="/admin-home" />;
    }
    return (
      <div className="contentGlobal">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="admin_login_input">
          <div className="login_part1">
            <MuiThemeProvider>
              <form onSubmit={this.handleSubmit}>
                <TextField type="text" name="email" placeholder="email" />
                <br />
                <TextField
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                />
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </form>
            </MuiThemeProvider>
          </div>
          <br />
          <div className="password_forget">
            <Link to={`/MDP`}>Mot de passe oublié ?</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAdmin;
