import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../helper/tokenHelper";

import AdminHeader from "./AdminHeader";
import "../CSS/AdminCreationEspace.scss";

export default class AdminCreationEspace extends Component {
    state = {
        name: "",
        email: "",
        address: "",
    }

    generateur = (max) => {
        let motdepasse = '';
        const lettre = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"];
        for (let i = 0; i < max; i++) {
            motdepasse = motdepasse + lettre[Math.floor(Math.random() * (lettre.length - 1))]
        }
        return motdepasse
    };

    handleOnSubmit = e => {
        e.preventDefault();
        const { name, email, address } = this.state;
        const body = {
            name,
            email,
            address,
            password: this.generateur(6)
        };

        axios.post("http://localhost:3030/club/create", body, { headers: getToken() })
            .then((res) => {
                console.log("code", res);
                if (res.status === 200) {
                    alert("Un espace club est créé");
                    this.props.history.push(`/admin-tous-clubs`)
                }
                else if (res.status === 206) {
                    console.log(res)
                    alert("Veuillez remplir tous les champs");
                }
                // else if (res.status === 500 || res.status === 400) {
                //     alert("Erreur lors de l'insertion des données")
                // }
                // else if (res.status === 409) {
                //     alert("Email est déja utiliseé pour un autre club")
                // }
            }
            )
            .catch(function (error) {
                console.log(error);
                alert(`Erreur lors de l'insertion des données: email est dèja utiliseé pour autre compte`)
            })
    }
    handleOnChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="AdminCreationEspace">
                <AdminHeader />
                <h2>Creation d'un espace club </h2>
                <form className="formulaire" onSubmit={this.handleOnSubmit} >
                    <label>
                        <h4>Nom de Club</h4>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleOnChange} />
                    </label> <br />
                    <label>
                        <h4>Email</h4>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleOnChange} />
                    </label> <br />
                    <label>
                        <h4>Adresse</h4>
                        <input type="text" name="address" value={this.state.address} onChange={this.handleOnChange} />
                    </label> <br />
                    <button className="button-send" type="submit" value="Submit"> envoyer </button>
                </form>
            </div>
        )
    }
}

