import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/CreationProjetGlobal.css'

class CreationProjetGlobal extends Component {
    state = {
        isLoaded: false,
        sponsors: undefined,
        sponsor: undefined
    }

    componentDidMount() {
        const url = "http://localhost:3030/sponsor"
        axios({
            method: "GET",
            url: url,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        sponsors: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    }
    handleOnChange(event) {
        event.preventDefault();
        this.setState({ sponsor: event.target.value });
    }
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <AdminHeader />
                    <div className="projetglobal">
                        <h2>Initialisation un projet global</h2>
                        <form className="formulaire" onSubmit={this.handleOnSubmit} method="POST" enctype="multipart/form-data" action="uploaddufichier">
                            <label>
                                Sponsor:
                                <select value={this.state.sponsor} onChange={this.handleOnChange} >
                                    {this.state.sponsors.map(sponsor => (
                                        <option value={sponsor.name}>{sponsor.name}</option>
                                    ))}
                                </select>
                            </label> <br />
                            <label>
                                Nom de projet:
                                <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label> <br />
                            <label>
                                Resumé de projet:
                                <input type="file" name="monfichier" /> <br />
                            </label> <br />
                            <label>
                                Visuel de produit:
                                <input type="file" name="monfichier" /> <br />
                            </label> <br />
                            <button type="submit" value="Submit"> envoyer </button>
                        </form>
                    </div>

                </div>

            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default CreationProjetGlobal;