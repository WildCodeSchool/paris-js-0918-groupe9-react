import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../helper/tokenHelper";
import "../CSS/AdminTousClubs.css";
import AdminHeader from "./AdminHeader";

class AdminTousClubs extends Component {
  state = {
    open: true,
    isLoaded: false,
    user: []
  };

  componentDidMount() {
    const url = "http://localhost:3030/club/table";
    axios({
      method: "GET",
      url: url,
      headers: getToken()
    }).then(
      result => {
        this.setState({
          isLoaded: true,
          user: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  filter = e => {
    const url = `http://localhost:3030/club/${e.target.value}`;
    axios({
      method: "GET",
      url: url,
      headers: getToken()
    }).then(
      result => {
        this.setState({
          isLoaded: true,
          user: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  };

  render() {
    console.log(this.state.user)
    if (this.state.isLoaded) {
      return (
        <div>
          <AdminHeader />
          <div className="buttonCreation">
            <Link to="/admin-creation-espace">
              <button>Ajouter un club</button>
            </Link>
          </div>
          <div className="allcards">
            <div className="custom-select1">
              <div className="type">
                <h1>Nom</h1>
                <select name="filter" onClick={this.filter}>
                  <option value="filtername">Nom</option>
                  <option value="filterdate">Mise à jour</option>
                </select>
              </div>
              {this.state.user.map((e, i) => (
                <Link to={`/admin-club/${e.id}`}>
                  <p className="element" key={i}>
                    {e.clubName}
                  </p>
                </Link>
              ))}
            </div>
            <div className="custom-select2">
              <div className="type">
                <h1>Convention Signée</h1>
              </div>
              {this.state.user.map((e, i) => (
                <p className="element" key={i}>
                  {e.contractName}
                </p>
              ))}
            </div>
            <div className="custom-select3">
              <div className="type">
                <h1>Logo</h1>
              </div>
              {this.state.user.map((e, i) => (
                <p className="element">
                  <img width="50"
                    key={i}
                    className="img-logo"
                    src={e.url_logo}
                    alt="logo"
                  />
                </p>
              ))}
            </div>
            <div className="custom-select4">
              <div className="type">
                <h1>Commande</h1>
              </div>
              {this.state.user.map((e, i) => (
                <p className="element" key={i}>
                  {e.status}
                </p>
              ))}
            </div>
            <div className="custom-select5">
              <div className="type">
                <h1>Formulaire Satisfaction</h1>
              </div>
              {this.state.user.map((e, i) => (
                <p className="element" key={i}>
                  {e.surveyStatus}
                </p>
              ))}
            </div>
            <div className="custom-select6">
              <div className="type">
                <h1>Action</h1>
              </div>
              {this.state.user.map((e, i) => (
                <p className="element" key={i}>
                  {e.actionName}
                </p>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
export default AdminTousClubs;
