import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';
import AdminHeader from './AdminHeader';
import '../CSS/AjouteProjet_Club.scss'
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
        url_signed_contract: ""

    }
    componentDidMount() {
        fetch("http://localhost:3030/project/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.state.projets = result;
                    this.state.project_id = result[0].id;
                    return fetch("http://localhost:3030/club/");
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        clubs: result,
                        club_id: result[0].id
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { project_id, club_id, name, url_contract, url_signed_contract } = this.state;
        const body = {
            project_id,
            club_id,
            name,
            url_contract,
            url_signed_contract
        };

        axios.post("http://localhost:3030/contract", body)
            .then((res) => {

                if (res.status == 200) {
                    alert("Contrat est créé");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })

    }
    handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
    }
    render() {
        const { error, isLoaded, projets, clubs, club_id, project_id } = this.state;
        if (error) {
            return (
                <div>
                    Error:{error.message}
                </div>
            );
        }
        if (!isLoaded) {
            return <div> Loading... </div>;
        }
        return (
            <div className="ajoute-projet-club">
                <div>
                    <AdminHeader />
                </div>
                <p>Ajouter un projet au club</p>
                <form className="formulaire" onSubmit={this.handleSubmit} method="POST" enctype="multipart/form-data" action="uploaddufichier">
                    <label>
                        Sélectioner un club :
                            <select name="club_id" value={club_id} onChange={this.handleChange}>
                            {clubs.map(club =>
                                <option value={club.id}>{club.name}</option>
                            )}
                        </select>
                    </label>
                    <br />
                    <label>
                        Sélectioner un projet global:
                            <select name="project_id" value={project_id} onChange={this.handleChange}>
                            {projets.map(projet =>
                                <option value={projet.id}>{projet.name}</option>
                            )}
                        </select>
                    </label>
                    <br />
                    <label>
                        Nom de contrat (convention):
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        bon de commande :
                        <input name="url_signed_contract" type="text" value={this.state.url_signed_contract} onChange={this.handleChange} />
                    </label>
                    <br />
                    <button type="submit" value="Submit"> Créer un nouveau contrat-club </button>
                </form>
                <div className="formulaire">
                <label>
                    convention :
                    <input type="file" name="file" accept=".pdf" onChange={this.onChangeFile} /> <br />
                    <button onClick={this.handleUpload}>Upload</button>
                </label>
                </div>
                
            </div>
        )
    }
}
export default AjouteProjet_Club; 