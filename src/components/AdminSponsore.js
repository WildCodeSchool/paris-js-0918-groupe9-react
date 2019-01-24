import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../helper/tokenHelper";

import AdminHeader from "./AdminHeader";

import Modal from "react-responsive-modal";
import "../CSS/AdminSponsore.scss";

class AdminSponsore extends Component {
  state = {
    name: undefined,
    //open: true,
    isLoaded: false,
    error: null,
    sponsors: [],
    projets: [],
    projetsSponsors: [],
    projetsBySponsorId: {},
    selectedSponsor: undefined,
    open: false,
    status: ""
  };

  componentDidMount() {
    const myInit = {
      method: "GET",
      headers: getToken()
    };
    fetch("http://localhost:3030/sponsor/", myInit)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            sponsors: result
          });
          return fetch("http://localhost:3030/project/", myInit);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          //this.state.projets = result;
          this.setState({
            projets: result
          });
          return fetch("http://localhost:3030/project_has_sponsor/", myInit);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            projetsSponsors: result,
            isLoaded: true
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

  handleCreationProjet = () => {
    this.props.history.push("/admin-creation-projetglobal");
  };

  handleOnClick = index => {
    this.props.history.push(`/admin-project/${index}`);
  };
  handleOnChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCreationSponsor = e => {
    e.preventDefault();
    const { name } = this.state;
    const body = {
      name
    };
    const headers = getToken();
    axios
      .post("http://localhost:3030/sponsor", body, { headers: headers })
      .then(res => {
        if (res.status === 200) {
          this.setState({ status: "Sponsor ajouté avec succès !" });
          this.openModal();
          this.state.name = "";
          this.componentDidMount();
        } else if (res.status === 204) {
          this.setState({
            status: "Erreur, veuillez renseigner le champ vide !"
          });
        } else {
          this.setState({ status: "Erreur lors de la requête" });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { error, isLoaded, sponsors, name } = this.state;
    const buttonDisabled = name === undefined || name.trim() === "";
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    if (isLoaded) {
      this.state.sponsors.forEach(sponsor => {
        this.state.projetsBySponsorId[sponsor.id] = [];
      });
      this.state.projetsSponsors.forEach(projetsSponsor => {
        const project_id = projetsSponsor.project_id;
        const project = this.state.projets.filter(p => p.id === project_id)[0];
        const sponsor_id = projetsSponsor.sponsor_id;
        const array = this.state.projetsBySponsorId[sponsor_id];
        array.push(project);
      });
      return (
        <div className="adminSponsor">
          <AdminHeader />
          <div className="format">
            <div className="listSponsor">
              <h2>Liste sponsors</h2>

              {sponsors.map(sponsor => (
                <div>
                  <p>
                    <h3>{sponsor.name}</h3>
                    
                      {this.state.projetsBySponsorId[sponsor.id].length !== 0 ? this.state.projetsBySponsorId[sponsor.id].map(
                        (projet, index) => (
                          <div className="projet" key={index}>
                            <p
                              onClick={() => this.handleOnClick(projet.id)}
                            >
                              {projet.name}
                            </p>
                          </div>
                        )
                      ): <p className="aucun">Aucun projet créé</p>}
                      
                    
                  </p>
                  <hr />
                </div>
              ))}
            </div>
            <div className="add">
              <h2>Ajouter / Créer</h2>
              <form onSubmit={this.handleCreationSponsor}>
                <input className="inputAjout"
                  type="text"
                  placeholder="Sponsor à ajouter"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                />{" "}
                <br />
                <button className="butt-ajout-sponsor" disabled={buttonDisabled} type="submit">
                  Ajouter sponsor{" "}
                </button>
                <Modal open={open} onClose={this.closeModal} center>
                  <h3>{this.state.status}</h3>
                </Modal>
              </form>
              <button className="butt-global-project" onClick={this.handleCreationProjet}>
                Créer un projet{" "}
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default AdminSponsore;
