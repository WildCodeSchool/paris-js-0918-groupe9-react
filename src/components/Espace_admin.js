import React, { Component } from 'react'
import axios from 'axios';

class Espace_admin extends Component {

    state= {

    }

    getParameters = async () => {
        console.log("ok")
        // const userId = 1;
        const results = await axios.get(`http://localhost:5000/user/`);
        console.log(results)
    }

    getClubs = async () => {
        console.log("ok")
        // const userId = 1;
        const results = await axios.get(`http://localhost:5000/user/`);
        console.log(results)
    }

  render() {
    return (
      <div>
        <div onClick={this.getParameters}>Mes paramètres</div>
        <div onClick={this.getClubs}>Clubs</div>
        <div onClick={this.getSponsors}>Sponsors</div>
        <div onClick={this.getGestion}>Gestion de projet</div>
      </div>
    )
  }
}

export default Espace_admin;