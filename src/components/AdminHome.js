import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/AdminHome.css'

class AdminHome extends Component {
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
                        <Link to="/admin-tous-clubs"><button className="inputclub" >CLUB</button></Link>    <br />
                        <Link to="/admin-sponsor"><button className="inputsponsor" >SPONSOR</button></Link>    <br />
                        <Link to="/admin-gestion-projet"><button className="inputprojet" >GESTION DE PROJET</button></Link>
                    </div>
                </div>

            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminHome;