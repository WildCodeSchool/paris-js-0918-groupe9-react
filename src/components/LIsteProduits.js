import React, { Component } from 'react'
import  '../CSS/ListeProduits.css'
import axios from 'axios'

class LIsteProduits extends Component {

    state = {
        resultat : []
    }

    componentDidMount = () => {
        axios.get('http://localhost:3030/product')
            .then(res => this.setState({
                resultat : res.data
            }))
    }



  render() {
    return (
      <div>
        <h1>LISTE DE PRODUITS</h1>
        <div>
            {this.state.resultat.map((e,i) => 
            <div className="produits"> 
                <p className="listes" key={i}>{e.name}</p>
                <div className="barre_button">
                    <input></input>
                    <button className="modif" onClick>MODIFIER</button>
                </div>
            </div>
            )}
        </div>
      </div>
    )
  }
}

export default LIsteProduits;
