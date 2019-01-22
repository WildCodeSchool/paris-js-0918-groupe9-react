import React, { Component } from 'react';
import axios from "axios";
import ClubHeader from './ClubHeader';
import '../CSS/ClubList.css';

const clubId = localStorage.getItem("clubId");
console.log(clubId)
const url = `http://localhost:3030/contract/${clubId}/list`;

class ClubList extends Component{

  state = {
    data: []
  }

  getProjects = () => {
    axios.get(url)
    .then(res => this.setState({ data: res.data }))
    .then(result => console.log(result))
  }

  // getClubs() {
  //   fetch(urlContract)
  //   .then(res => res.json())
  //   .then(res => this.setState({ clubs: res }))
  // }

  componentDidMount() {
    this.getProjects();
    // this.getClubs();
  }

  render() {

    console.log(this.state.data)

    if(this.state.data){
      return(
        <div>
          <ClubHeader/>
        <div className="contain">
        
          <div className="project grp-input">
            <h1>Projets</h1>
              {
                this.state.data.map((x, i) => (
                  <button key={i}><a href={'/club-convention/' + x.contractId}>{x.contractName}</a></button>
                ))
              }
          </div>

          <div className="resume grp-input">
            <h1>Résumé</h1>
              {
                this.state.data.map((x, i) => (
                <button key={i}><a href={x.url_summary}>Résumé</a></button>
              ))
            }
          </div>

          <div className="visuel grp-input">
            <h1>Visuels</h1>
              {
                this.state.data.map((x, i) => (
                <button key={i}><a href={x.visual_shirt}>Visuel</a></button>
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
