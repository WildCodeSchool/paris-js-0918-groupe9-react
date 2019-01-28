import React, { Component } from "react";
import { getToken } from "../helper/tokenHelper";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import '../CSS/MDP.scss'

class MDPForget extends Component {
    state = {
        email: ""
    }
    generateur = (max) => {
        let motdepass = '';
        const lettre = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"];
        for (let i = 0; i < max; i++) {
            motdepass = motdepass + lettre[Math.floor(Math.random() * (lettre.length - 1))]
        }
        return motdepass
    }
    handleOnSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: this.state.email,
            password: this.generateur(6)
        }
        axios.put("http://localhost:3030/MDP", body, { headers: getToken() })
        .then (this.props.history.push(`/`))
        
    }
    handleOnchange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                    <AdminHeader />
                </div>
                <div className="MDP">
                    <form onSubmit={this.handleOnSubmit}>
                    <input
                        placeholder="votre email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleOnchange}
                    >
                    </input>
                    <button type="submit" value="Submit">Recevoir mon nouveau mot de passe</button>
                    </form>
                </div>
            </div>
        )
    }
};
export default MDPForget;