import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';
import ClubHeader from './ClubHeader'
import { Link } from 'react-router-dom'
import '../CSS/AdminParameters.css';



class ClubConvention extends Component {
    state = {
        open: true,
        isLoaded: true,
        clubs: undefined,
        toggle:false,
        file: ''
    }

    toggleConv = () => {
      this.setState({
        toggle: !this.state.toggle
      })
    }

    handleChange = (e) => {
      this.setState({
        file: e.target.files[0]
      })
    }

    async handleDownload (){

      // const call = await fetch('http://localhost:3030/club/contract/1');
      // const data = call.json();
      // console.log(data);
      // console.log(data.url_contract);
      // window.open(data.url_contract)

      fetch('http://localhost:3030/club/contract/1')
      .then(res => res.json())

      .then(res => this.setState({ file: res[0].url_contract}))
      .then(res => console.log(this.state.file))
      window.open(this.state.file);
    }

    handleUpload = (e) => {
      if(this.state.file){
        e.preventDefault();
        const formData = new FormData();
        formData.append('fichier',this.state.file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post("/", formData, config)
          .then((response) => {
              alert("Fichier envoyé avec succès");
          }).catch((error) => {
            console.log('erreur : ', error);
        });
      }
      else{
        e.preventDefault();
        alert('Veuillez sélectionner un fichier');
      }
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                  <ClubHeader/>
                  <div className="groupe-input">
                    <button onClick={this.toggleConv}>Convention</button>

                    {
                    this.state.toggle &&
                    <div className='download-upload'>
                    <button onClick={this.handleDownload}>Télécharger</button>
                      <form onSubmit={this.handleUpload}>
                        <input type='file' name='fichier' onClick={this.handleChange}/>
                        <button type='submit'>Envoyer</button>
                      </form>

                    </div>
                    }
                    <br />
                    <button><Link to='/Bon-de-Commande'>Bon de Commande</Link></button><br />
                    <button><Link to='/Actions-en-Contrepartie'>Actions en Contrepartie</Link></button> <br />
                    <button><Link to='/Formulaire-de-Satisfaction'>Formulaire de Satisfaction</Link></button>    <br />
                  </div>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }
    }
}
export default ClubConvention;
