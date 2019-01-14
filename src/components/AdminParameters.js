import React, { Component } from "react";
import AdminHeader from "./AdminHeader";
import "../CSS/AdminParameters.css";
import Axios from "axios";

class AdminParameters extends Component {
  state = {
    identifiantState: false,
    adresseState: false,
    telephoneState: false,
    emailState: false,
    resultat: [],
    password: "",
    adress: "",
    email: "",
    phone: ""
  };

  toggle = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
    if (e.target.name === "adresseState") {
      this.changeAdresse();
    } else if (e.target.name === "telephoneState") {
      this.changePhone();
    } else if (e.target.name === "emailState") {
      this.changeEmail();
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changePassword = e => {
    e.preventDefault();
    console.log(e.target.oldPassword.value, e.target.newPassword.value);
    if (
      e.target.oldPassword.value === this.state.password &&
      e.target.newPassword.value !== e.target.oldPassword.value &&
      e.target.newPassword.value === e.target.confirmationPassword.value
    ) {
      const url = "http://localhost:3030/user/password/3";
      Axios.put(url, {
        password: e.target.newPassword.value
      });
    }
  };

  changeAdresse = e => {
    // e.preventDefault();
    const url = "http://localhost:3030/user/3";
    Axios.put(url, {
      adress: this.state.adress
    });
  };

  changePhone = e => {
    // e.preventDefault();
    const url = "http://localhost:3030/user/3";
    Axios.put(url, {
      phone: parseInt(this.state.phone)
    });
  };

  changeEmail = e => {
    // e.preventDefault();
    const url = "http://localhost:3030/user/3";
    Axios.put(url, {
      email: this.state.email
    });
  };

  componentDidMount() {
    const url = "http://localhost:3030/user/3";
    Axios({
      method: "GET",
      url: url
    }).then(result =>
      this.setState({
        adress: result.data[0].adress,
        password: result.data[0].password
      })
    );
  }

  render() {
    console.log(this.state.password);
    return (
      <div>
        <AdminHeader />
        <div className="groupe-input">
          <button name="identifiantState" onClick={this.toggle}>
            Identifiant
          </button>
          <br />
          {this.state.identifiantState ? (
            <div>
              <form onSubmit={this.changePassword}>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="mot de passe"
                />
                <br />
                <p>Cette section vous permet de changer votre mot de passe</p>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="nouveau mot de passe"
                />
                <input
                  type="password"
                  name="confirmationPassword"
                  placeholder="confirmer votre mot de passe"
                />
                <br />
                <br />
                <button type="submit">Valider</button>
              </form>
              <hr />
              <br />{" "}
            </div>
          ) : null}

          <button name="adresseState" onClick={this.toggle}>
            Adresse
          </button>
          <br />
          {this.state.adresseState ? (
            <div>
              <input
                onChange={this.handleChange}
                name="adress"
                value={this.state.adress}
                // placeholder="nouvelle adresse"
              />
              <br />
              <br />
              <button
                name="adresseState"
                className="valider"
                onClick={this.toggle}
              >
                Valider
              </button>
              <hr />
              <br />
            </div>
          ) : null}
          <button name="telephoneState" onClick={this.toggle}>
            Téléphone
          </button>
          <br />
          {this.state.telephoneState ? (
            <div>
              <input
                value={this.state.phone}
                onChange={this.handleChange}
                name="phone"
                placeholder="nouveau numéro de téléphone"
              />
              <br />
              <br />
              <button
                name="telephoneState"
                className="valider"
                onClick={this.toggle}
              >
                Valider
              </button>
              <hr />
              <br />
            </div>
          ) : null}
          <button name="emailState" onClick={this.toggle}>
            Email
          </button>
          <br />
          {this.state.emailState ? (
            <div>
              <input
                name="email"
                onChange={this.handleChange}
                placeholder="nouvelle adresse email"
              />
              <br />
              <br />
              <button
                name="emailState"
                className="valider"
                onClick={this.toggle}
              >
                Valider
              </button>
              <hr />
              <br />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdminParameters;
