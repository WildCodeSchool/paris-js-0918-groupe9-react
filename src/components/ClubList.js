import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/AdminParameters.css';
import ClubHeader from './ClubHeader';
import '../CSS/ClubList.css';

const urlClub = 'http://localhost:3030/club/';
const urlContract = 'http://localhost:3030/contract/';


class ClubList extends Component{

  state = {
    projects: [],
    clubs: [],
    isLoaded: false
  }

  getContracts() {
    fetch(urlContract)
    .then(res => res.json())
    .then(res => this.setState({ projects: res }))
  }

  getClubs() {
    fetch(urlClub)
    .then(res => res.json())
    .then(res => this.setState({ clubs: res }))
  }

  componentDidMount() {
    this.getContracts();
    this.getClubs();
  }

  render() {
    console.log(this.state.projects);
    console.log(this.state.clubs);

    if(this.state.projects && this.state.clubs){
      return(
        <div>
          <ClubHeader/>
        <div className="contain">

          <div className="projects">
            <h1>Projets</h1>
              {
                this.state.projects.map((x, i) => (
                  <li key={i}>{x.name}</li>
                ))
              }
          </div>

          <div className="clubs">
            <h1>Clubs</h1>
              {
                this.state.clubs.map((x, i) => (
                <li key={i}>{x.name}</li>
              ))
            }
          </div>

        </div>
        </div>
      )
    }
      return(
        <div>
          Loading...
        </div>
      )
    }
  }

export default ClubList;
