import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import'../CSS/AdminClub.scss'

class AdminClub extends Component {
    state = {
        isLoaded: false,
        club: "",
        projet: []
    }

    componentDidMount() {
        const url = "http://localhost:3030/club/" + this.props.match.params.id
        axios({
            method: "GET",
            url: url,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        club: result.data[0]
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
        axios({
            method: "GET",
            url: "http://localhost:3030/club/club-contract/" + this.props.match.params.id,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        projet: result.data
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
                console.log(this.state.isLoaded)
    }
    handleOnCLick = () => {
        this.props.history.push(`/ajoute-projet-club?clubid=${this.state.club.id}`)
    }

    handleOrder = (orderId) => { 
        this.props.history.push(`/order-render/${orderId}`)
    }

    handleDownload = (url) => {
        window.open(`http://localhost:3030/${url}`);
    }

    renderOrder = id => {
        this.props.history.push(`/order-render/${id}`)
    }

    render() {
        const { club, projet } = this.state;
        if (this.state.isLoaded) {
            console.log(club)
            return (
                <div className="AdminClub">
                    <AdminHeader />
                    <h1> CLUB {club.name} </h1>
                    <div className="info">
                    <h3>Address : {club.address}</h3>
                    <h3>Telephone : {club.phone}</h3>
                    <h3>Email : {club.email}</h3>
                    </div>
                    <div>
                    <p> Logo </p>
                    {club.url_logo ?<img 
                    src={`http://localhost:3030/${club.url_logo}`} 
                    alt={club.name} width="100px" /> : "pas de logo"}  
                    <button onClick={()=>this.handleDownload(club.url_logo)} >Télécharger logo </button>
                    </div>
                    <p> Logo vectorized </p>
                    {club.url_logo ?<img 
                    src={`http://localhost:3030/${club.url_logo_vectorized}`} 
                    alt={club.name} width="100px" /> : "pas de logo vectorized"}  
                    <button onClick={()=>this.handleDownload(club.url_logo_vectorized)} >Télécharger logo </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Projet</th>
                                <th>Convention</th>
                                <th>Bon de commande</th>
                                <th>Formulaire de satisfaction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projet.map((e,i) => (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td><button onClick={()=>this.handleDownload(e.url_signed_contract)}> {e.url_signed_contract?"Télécharger":"pas de convention signé"}</button></td>
                                    <td><button onClick={() => this.renderOrder(e.order_id)}>{e.order_id?"Télécharger":"pas de bon de commande"}  </button></td>
                                    <td><button>{e.survey_id?"Télécharger":"pas de formulaire de statisfaction"} </button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={this.handleOnCLick}>Ajouter un projet</button>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }
    }
}
export default AdminClub;