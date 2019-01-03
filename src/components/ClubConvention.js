import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';
import ClubHeader from './ClubHeader'
import { Link } from 'react-router-dom'


class ClubConvention extends Component {
    state = {
        open: true,
        isLoaded: true,
        clubs: undefined,
        toggle:false
    }
    toggleConv = () => {
      this.setState({
        toggle: !this.state.toggle
      })
    }
    handleDownload = () => {
      
    }
    handleUpload = () => {

    }
    
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                  <ClubHeader/>
                  <button onClick={this.toggleConv}>Convention</button>
                  {
                  this.state.toggle && 
                    <div>          
                      <button onClick={this.handleUpload}>Télécharger</button>
                      <button onClick={this.handleDownload}>Envoyer</button>
                    </div> 
                  } 
                  <button><Link to='/Bon-de-Commande'>Bon de Commande</Link></button>
                  <button><Link to='/Actions-en-Contrepartie'>Actions en Contrepartie</Link></button> 
                  <button><Link to='/Formulaire-de-Satisfaction'>Formulaire de Satisfaction</Link></button>                  
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default ClubConvention;