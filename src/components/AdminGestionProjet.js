import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/AdminHome.css'

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
        if (this.state.isLoaded) {
            return (
                <div>
                    <AdminHeader />
                    <div className="groupe-input">
                        <Link to="/"><button>Formulaire de satisfaction</button></Link>    <br />

                    </div>
                </div>

            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminGestionProjet;