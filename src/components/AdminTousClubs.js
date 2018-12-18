import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken, getClubId } from '../helper/tokenHelper';
import '..//CSS/AdminTousClubs.css'
import AdminHeader from './AdminHeader';
import '../CSS/AdminHome.css'

class AdminTousClubs extends Component {
    state = {
        open: true,
        isLoaded: false,
        user: undefined
    }

    componentDidMount() {
        const url = "http://localhost:3030/club"
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
                    <div className="allcards">
                        <div className="custom-select1">
                            <h1>Nom</h1>
                            {this.state.user.map((e,i) => 
                                <p key={i}>{e.email}</p>
                            )}
                        </div>
                        <div className="custom-select2">
                            <h1>Convention Signée</h1>
                        </div>
                        <div className="custom-select3">
                            <h1>Logo</h1>
                        </div>
                        <div className="custom-select4">
                            <h1>Commande</h1>
                        </div>
                        <div className="custom-select5">
                            <h1>Formulaire Satisfaction</h1>
                        </div>
                        <div className="custom-select6">
                            <h1>Action</h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminTousClubs;




















{/* <div class="custom-select">
                            <div class="custom">
                                <h1>Nom</h1>
                                <select>
                                    <option value="0">Nom</option>
                                    <option value="1">Récent</option>
                                    <option value="2">Ancien</option>
                                </select>
                            </div>
                        </div> */}