import React, { Component } from "react";
import { getToken } from "../helper/tokenHelper";
import AdminHeader from "./AdminHeader";
import "../CSS/AdminParameters.scss";
import Axios from "axios";

class AdminParameters extends Component {
  state = {
    identifiantState: false,
    adresseState: false,
    telephoneState: false,
    emailState: false,
    resultat: [],
    password: "",
    address: "",
    email: "",
    phone: ""
  };

  toggle = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changePassword = e => {
    e.preventDefault();
    if (e.target.newPassword.value === e.target.confirmationPassword.value) {
      const url = "http://localhost:3030/user/password/1";
      Axios.put(
        url,
        {
          oldPassword: e.target.oldPassword.value,
          password: e.target.newPassword.value
        },
        { headers: getToken() }
      ).then(result => alert("mot de passe modifié"));
    } else {
      alert("mot de passe différent");
    }
  };

  changeAdresse = e => {
    const url = "http://localhost:3030/user/1";
    Axios.put(
      url,
      {
        address: this.state.address
      },
      { headers: getToken() }
    );
    this.setState({
      adresseState: !this.state.adresseState
    })
  };

  changePhone = e => {
    // e.preventDefault();
    const url = "http://localhost:3030/user/1";
    Axios.put(
      url,
      {
        phone: this.state.phone
      },
      { headers: getToken() }
    );
    this.setState({
      telephoneState: !this.state.telephoneState
    })
  };

  changeEmail = e => {
    // e.preventDefault();
    const url = "http://localhost:3030/user/1";
    Axios.put(
      url,
      {
        email: this.state.email
      },
      { headers: getToken() }
    );
    this.setState({
      emailState: !this.state.emailState
    })
  };

  componentDidMount() {
    const url = "http://localhost:3030/user/1";
    Axios({
      method: "GET",
      url: url,
      headers: getToken()
    }).then(result =>
      this.setState({
        address: result.data[0].adress,
        password: result.data[0].password
      })
    );
  }

  render() {
    console.log(this.state.phone);
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
                <button className="butt-password" type="submit">Valider</button>
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
                name="address"
                value={this.state.adress}
                // placeholder="nouvelle adresse"
              />
              <br />
              <br />
              <button
                name="adresseState"
                className="valider"
                onClick={this.changeAdresse}
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
                onClick={this.changePhone}
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
                onClick={this.changeEmail}
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
