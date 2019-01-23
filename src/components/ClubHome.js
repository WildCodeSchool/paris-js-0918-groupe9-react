import React, { Component } from "react";
import axios from "axios";
import { getToken, getClubId } from "../helper/tokenHelper";
import ClubHeader from "./ClubHeader";
import "../CSS/AdminParameters.css";
// import { log } from 'util';

class ClubHome extends Component {
  state = {
    open: true,
    isLoaded: true,
    clubs: undefined
  };

  componentDidMount() {
    // const url = "http://localhost:3030/club/" + getClubId();
    const url = `http://localhost:3030/club/${this.props.match.params.id}`;
    axios({
      method: "GET",
      url: url,
      headers: getToken()
    }).then(
      result => {
        this.setState({
          isLoaded: true,
          clubs: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  render() {
    console.log(this.state.clubs);

    if (this.state.isLoaded) {
      return (
        <div>
          <ClubHeader />
          {this.state.clubs
            ? this.state.clubs.map(club => <h1>{club.name}</h1>)
            : null}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
export default ClubHome;
