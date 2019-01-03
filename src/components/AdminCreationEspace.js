import React, { Component } from 'react';
import axios from 'axios';

import AdminHeader from './AdminHeader';

export default class AdminCreationEspace extends Component {
    state = {
        name: undefined,
        email: undefined,
        address: undefined,
    }
    generateur = (max) => {
        let motdepass = '';
        const lettre = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (let i = 0; i < max; i++) {
            motdepass = motdepass + lettre[Math.floor(Math.random() * (lettre.length - 1))]
        }
        return motdepass
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { name, email, address } = this.state;
        const body = {
            name,
            email,
            address,
            password: this.generateur(6),
        };
        axios.post("http://localhost:3030/club/create", body)
            .then((res) => {
                if (res.status == 200) {
                    alert("Un espace club est créé");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }
    handleOnChange =(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <AdminHeader />
                <h2>Creation espace pour club </h2>
                <form className="formulaire" onSubmit={this.handleOnSubmit} >
                    <label>
                        <h4>Nom de Club</h4>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleOnChange} />
                    </label> <br />
                    <label>
                        <h4>Email</h4>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleOnChange} />
                    </label> <br />
                    <label>
                        <h4>Adress</h4>
                        <input type="text" name="address" value={this.state.address} onChange={this.handleOnChange} />
                    </label> <br />
                    <button type="submit" value="Submit"> envoyer </button>
                </form>
            </div>
        )
    }
}