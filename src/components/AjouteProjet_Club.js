import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { getToken, getClubId } from "../helper/tokenHelper";
import AdminHeader from "./AdminHeader";
import "../CSS/AjouteProjet_Club.scss";

class AjouteProjet_Club extends Component {
  state = {
    isLoaded: false,
    error: null,
    projets: [],
    clubs: [],
    project_id: undefined,
    club_id: undefined,
    name: "",
    url_contract: "",
    file: undefined,
    products: [],
    productsSelected: [],
    contract_id: undefined
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const myInit =
    {
      method: 'GET',
      headers: getToken(),
    };
    fetch("http://localhost:3030/project/", myInit)
      .then(res => res.json())
      .then(
        result => {
          if (result.length !== 0) {
            const queryProjetId = values.projetid
            ? values.projetid
            : result[0].id;
          this.setState({
            projets: result,
            project_id: queryProjetId
          });
          return fetch("http://localhost:3030/club", myInit);
          } 
          return fetch("http://localhost:3030/club", myInit);
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
          if (result.length !== 0) {
            const queryClubId = values.clubid ? values.clubid : result[0].id;
          this.setState({
            isLoaded: true,
            clubs: result,
            club_id: queryClubId,
          });
          }
          this.setState({
            isLoaded: true,
            clubs: result,
          });
        },
        error => {
          console.log(error);

          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      ;

    fetch("http://localhost:3030/product", myInit)
      .then(res => res.json())
      .then(data =>
        this.setState({
          products: data
        })
      );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    const array = this.state.productsSelected;
    for (var i = 0; i < array.length; i++) {
      formdata.append('products[]', array[i]);
    }
    formdata.append("file", this.state.file);
    formdata.append("project_id", this.state.project_id);
    formdata.append("club_id", this.state.club_id);
    formdata.append("name", this.state.name);

    axios({
      method: "post",
      url: "http://localhost:3030/contract/uploaddufichier",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data", ...getToken() }
    })
      .then(res => {
        if (res.status === 200) {
          alert("Contrat créé");
          this.props.history.push(`/admin-project/${this.state.project_id}`);
        }
        if (res.status === 206){
          alert("Veuillez-vous remplir tous les champs")
        }
        if (res.status === 210){
          alert('ajouter les produits pour le bon de commande');
          this.props.history.push(`/liste-produits`)
        }
      })
      .catch(function (error) {
        console.log(error);
      });;
  };

  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  onChangeFile = e => {
    this.setState({ file: e.target.files[0] });
  };

  check = e => {
    if (e.target.checked) {
      this.setState({
        productsSelected: [
          ...this.state.productsSelected,
          Number(e.target.value)
        ]
      });
    } else {
      this.setState({
        productsSelected: this.state.productsSelected.filter(
          el => el !== Number(e.target.value)
        )
      });
    }
  };

  render() {
    console.log(this.state.productsSelected);
    const { error, isLoaded, projets, clubs, project_id, club_id } = this.state;
    const values = queryString.parse(this.props.location.search);
    const disabledClub = values.clubid !== undefined;
    const disabledProject = values.projetid !== undefined;
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    if (projets.length !== 0 && clubs.length !== 0) { 
      return (
        <div className="ajoute-projet-club">
          <div>
            <AdminHeader />
          </div>
          <p>Ajouter un projet au club</p>
          <form className="formulaire" onSubmit={this.handleSubmit}>
            <label>
              Sélectioner un club :
              <select
                disabled={disabledClub}
                name="club_id"
                value={club_id}
                onChange={this.handleChange}
              >
                {clubs.map(club => (
                  <option value={club.id}>{club.name}</option>
                ))}
              </select>
            </label>

            <br />

            <label>
              Sélectioner un projet global:
              <select
                disabled={disabledProject}
                name="project_id"
                value={project_id}
                onChange={this.handleChange}
              >
                {projets.map(projet => (
                  <option value={projet.id}>{projet.name}</option>
                ))}
              </select>
            </label>

            <br />

            <label>
              Nom de contrat (convention):
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              convention :
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={this.onChangeFile}
              />{" "}
            </label>
            <br />
            <label>
              bon de commande :
              {this.state.products
                ? this.state.products.map((e, i) => (
                  <div>
                    <input
                      type="checkbox"
                      name={e.name}
                      value={e.id}
                      onChange={this.check}
                    />
                    {e.name}
                  </div>
                ))
                : null}
            </label>
            <button type="submit" value="Submit">
              {" "}
              Créer un nouveau contrat-club{" "}
            </button>
          </form>

        </div>
      );
    }
    if (projets.length === 0){
      return (
        <div>
          <Link to={`/admin-creation-projetglobal`}> Il n'y a pas de projet global, veuillez ajouter un projet global </Link>
        </div>
      )
    }
    if (clubs.length == 0)
    return (
      <div>
        <Link to={`/admin-creation-espace`}> Il n'y a pas de club, veuillez ajouter un club </Link>
      </div>
    )

  }

}
export default AjouteProjet_Club;