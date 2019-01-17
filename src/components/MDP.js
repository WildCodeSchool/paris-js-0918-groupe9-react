import React, { Component } from "react";
import { getToken, getClubId } from "../helper/tokenHelper";
import AdminHeader from "./AdminHeader";
import Axios from "axios";

class MDPForget extends Component {
    state = {
        email: ""
    }
    handleOnSubmit = () => {
        e.preventDefault();
        const url = ;
        body = {
            email: this.state.email
        }
        axios.post(url, body, { headers: getToken() })
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
                <AdminHeader />
            </div>

            <div>
                <form onSubmit={handleOnSubmit}></form>
                <input
                    placeholder="votre email"
                    name="email"
                    value={this.state.email}
                    onChange={handleOnchange}
                >
                </input>
                <button type="submit" value="Submit">Recevoir mon nouveau mot de pass</button>
            </div>
        )
    }
};
export default MDPForget;