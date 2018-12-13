import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';
import '../CSS/Adminhome.css';
import AdminHeader from './AdminHeader';

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
                    <AdminHeader/>
                <div className="groupe-input">
                    <button>CLUB</button><br />
                    {/* {this.state.user.map(user => <h1>{user.email}</h1>)} */}
                    <button>SPONSOR</button><br />
                    <button>GESTION DE PROJET</button>            
                </div>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default AdminHome;