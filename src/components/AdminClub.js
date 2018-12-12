import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';

class AdminClub extends Component {
    state = {
        isLoaded: false,
        club: undefined,
        projet: []
    }

    componentDidMount() {
        const url = "http://localhost:3030/club/1"
        axios({
            method: "GET",
            url: url,
            // headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        club: result.data[0]
                    });
                    console.log(this.state.club);

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
        axios({
            method: "GET",
            url: "http://localhost:3030/club/projet/1",
            // headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        projet: result.data
                    });
                    console.log(this.state.club);

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    }
    render() {
        const { club, projet } = this.state;
        if (this.state.isLoaded) {
            return (
                <div>
                    <AdminHeader />
                    <h1> CLUB {club.name} </h1>
                    <h3>Address : {club.address}</h3>
                    <h3>Telephone : {club.phone}</h3>
                    <h3>Email : {club.email}</h3>
                    <h3> Logo </h3><img src={club.url_logo} alt={club.name} width="100px" />
                    <button>Télécharger logo </button>
                    <h3>Projet</h3>
                    <ul>
                       {projet.map(e=>(
                           <li> {e.name} {e.url_contract} {e.url_signed_contract}</li>
                       ))}
                    </ul>

                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminClub;