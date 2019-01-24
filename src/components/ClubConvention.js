import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../helper/tokenHelper';
import ClubHeader from './ClubHeader'
import { Link } from 'react-router-dom'
import '../CSS/AdminParameters.css';



class ClubConvention extends Component {
    state = {
        open: true,
        isLoaded: true,
        clubs: undefined,
        toggle:false,
        file: null
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

    handleDownload = () => {
      // const call = await fetch('http://localhost:3030/club/contract/1');
      // const data = call.json();
      // console.log(data);
      // console.log(data.url_contract);
      // window.open(data.url_contract)

      axios.get("http://localhost:3030/club/contract/" + this.props.match.params.id,{ headers: getToken() })
      .then(res => window.open(`http://localhost:3030/${res.data[0].url_contract}`))
    }

    handleUpload = (e) => {
      if(this.state.file){
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',this.state.file);
        // const config = {
        //   headers: {
        //     'content-type': 'multipart/form-data'
        //   }
        // };
        const headers = { "Content-Type": "multipart/form-data", ...getToken() }
        axios.put(`http://localhost:3030/club/uploaddufichier/${this.props.match.params.id}`, formData, {headers: headers})
          .then((response) => {
              alert("Fichier envoyé avec succès");
              this.setState ({
                toggle: !this.state.toggle
              })
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
      console.log(this.state.file)
      console.log(this.formData) 
      
      if (this.state.isLoaded) {
            return (
                <div>
                  <ClubHeader/>
                  <div className="groupe-input">
                    <button onClick={this.toggleConv}>Convention</button>

                    {
                    this.state.toggle &&
                    <div className='download-upload'>
                    <p>Convention à signer: </p>
                    <button onClick={this.handleDownload}>Télécharger</button>
                    <p>Convention signée: </p>
                      <form onSubmit={this.handleUpload}>
                        <input type='file' name='file' onChange={this.handleChange}/>
                        <button type='submit'>Envoyer</button>
                      </form>

                    </div>
                    }
                    <br />
                    <button><Link to={"/bon-de-commande/"+this.props.match.params.id}>Bon de Commande</Link></button><br />
                    <button><Link to="/actions-en-contrepartie/1">Actions en Contrepartie</Link></button><br />
                    <button><Link to="/formulaire-de-satisfaction/1">Formulaire de Satisfaction</Link></button><br />
                  </div>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }
    }
}
export default ClubConvention;
