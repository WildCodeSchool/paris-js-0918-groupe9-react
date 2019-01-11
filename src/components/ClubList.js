import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../CSS/AdminParameters.css';
import ClubHeader from './ClubHeader';

const urlClub = 'http://localhost:3030/club/';


class ClubList extends Component {

  state = {
    clubs: [],
    projects: [],
    isLoaded: false
  }

  async componentDidMount () {
    const call = await fetch(urlClub)
    const data = call.json()
    console.log(data);
}
  render() {
    const clubsList = this.state.clubs
    .map((club, index) => (
      <li key={index}>{club}</li>
    ))
    // console.log('ok');

    if(this.state.isLoaded)
      return (
        <div>
        {clubsList}
        </div>
      )
      return(
        <div>Loading...</div>
      )
  }
}

export default ClubList;
