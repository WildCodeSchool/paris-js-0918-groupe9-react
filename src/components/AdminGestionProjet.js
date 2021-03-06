import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/AdminGestionProjet.scss'

class AdminGestionProjet extends Component {
    state = {
        open: true,
        isLoaded: false,
        user: undefined
    }

    componentDidMount() {
        const url = "http://localhost:3030/user"
        axios({
            method: "GET",
            url: url,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        user: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    }
    render() {
        console.log(this.state.user);
        if (this.state.isLoaded) {
            return (
                <div>
                    <AdminHeader />
                    <div className="groupe-input">
                        <Link to="/"><button className="button1">FORMULAIRE DE SATISFACTION</button></Link>    <br />
                        <Link to="/liste-produits"><button className="button2">LISTE DE PRODUITS </button></Link>    <br />
                        <Link to="/"><button className="button3">ACTIONS CONTREPARTIES</button></Link>    <br />
                    </div>
                </div>

            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminGestionProjet;