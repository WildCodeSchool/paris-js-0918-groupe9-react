import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';
import ClubHeader from './ClubHeader'
import '../CSS/AdminParameters.css';
import { log } from 'util';


class ClubHome extends Component {
    state = {
        open: true,
        isLoaded: true,
        clubs: undefined
    }

    componentDidMount() {
        const url = "http://localhost:3030/club/" + getClubId();
        axios({
            method: "GET",
            url: url,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        clubs: result.data
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
        console.log(this.state.clubs);
        
        if (this.state.isLoaded) {
            return (
                <div>
                    <ClubHeader/>
                    <h3> Clubs</h3>
                    {this.state.clubs ? this.state.clubs.map(club => <h1>{club.name}</h1>): null}
                    <h3>Sponsor</h3>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default ClubHome;