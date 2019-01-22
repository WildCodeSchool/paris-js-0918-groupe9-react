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
    console.log(this.state.user);
    if (this.state.isLoaded) {
      return (
        <div>
          <AdminHeader />
          <div className="buttonCreation">
            <Link to="/admin-creation-espace">
              <button className="button_ajoutClub">Ajouter un club</button>
            </Link>
          </div>
          <div className="allcards">
            <div className="custom-select">
              <div className="type">
                <h1>Nom</h1>
                <select name="filter" onClick={this.filter}>
                  <option value="filtername">Nom</option>
                  <option value="filterdate">Mise à jour</option>
                </select>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <Link to={`/admin-club/${e.clubId}`}>
                    <p className="element">{e.clubName}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="custom-select">
              <div className="type">
                <h1>Convention Signée</h1>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <p className="element">{e.contractName}</p>
                </div>
              ))}
            </div>
            <div className="custom-select">
              <div className="type">
                <h1>Logo</h1>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <p className="element">
                    {e.url_logo ? (
                      <img
                        width="50"
                        className="img-logo"
                        src={`http://localhost:3030/${e.url_logo}`}
                        alt="logo"
                      />
                    ) : (
                      "pas de logo"
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="custom-select">
              <div className="type">
                <h1>Commande</h1>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <p className="element">
                    {e.orderId ? (
                      <span>
                        <Link to={`/order-render/${e.orderId}`}>
                          {" "}
                          Commande{" "}
                        </Link>
                        / {e.status}
                      </span>
                    ) : (
                      "ø"
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="custom-select">
              <div className="type">
                <h1>Formulaire Satisfaction</h1>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <p className="element">{e.surveyStatus}</p>
                </div>
              ))}
            </div>
            <div className="custom-select">
              <div className="type">
                <h1>Action</h1>
              </div>
              {this.state.user.map((e, i) => (
                <div className="rows" key={i}>
                  <p className="element">{e.actionName}</p>
                </div>
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
