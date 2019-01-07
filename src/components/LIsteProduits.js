import React, { Component } from 'react'
import  '../CSS/ListeProduits.css'
import axios from 'axios'


class LIsteProduits extends Component {

    state = {
        resultat : []
    }

    componentDidMount = () => {
        axios.get('http://localhost:3030/product/')
            .then(res => this.setState({
                resultat : res.data
            }))
    }

   
    changeName = (e) => {
        console.log(e.target.butt.value)
        const id = e.target.butt.id
        const url = `http://localhost:3030/product/${id}`
        axios.put(url, {
          name: e.target.butt.value
        })
    }

  render() {
    return (
      <div>
        <h1>LISTE DE PRODUITS</h1>
        <div>
            {this.state.resultat.map((e,i) => 
            <div className="produits"> 
                <p className="listes" key={i}>- {e.name}</p>
                <div className="barre_button">
                <form  onSubmit={this.changeName}>
                    <input 
                    className="liste_input"
                    id={e.id}
                    name="butt"
                    ></input>
                    <button 
                    type="submit"
                    className="modif" 
                    >MODIFIER</button>
                </form>
                </div>
            </div>
            )}
        </div>
      </div>
    )
  }
}

export default LIsteProduits;
