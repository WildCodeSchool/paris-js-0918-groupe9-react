import React, { Component } from 'react'
import '../CSS/ListeProduits.css'
import axios from 'axios';
import { getToken, getClubId } from "../helper/tokenHelper";


class LIsteProduits extends Component {

    state = {
        resultat: []
    }

    handleAdd = (e) => {
        // e.preventDefault()
        console.log(e.target.add.value)
        if ((e.target.add.value).length > 0 && (e.target.add.value) !== " ") {
            const id = e.target.add.id
            const url = `http://localhost:3030/product/${id}`
            axios.post(url, {
                name: e.target.add.value,
                category: e.target.add2.value
            }, {headers: getToken()})
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3030/product/', {headers: getToken()})
            .then(res => this.setState({
                resultat: res.data
            }))
    }


    changeName = (e) => {
        console.log(e.target.butt.value)
        if ((e.target.butt.value).length > 0 && (e.target.butt.value) !== " ") {
            const id = e.target.butt.id
            const url = `http://localhost:3030/product/${id}`
            axios.put(url, {
                name: e.target.butt.value
            })
        }
    }

    render() {
        return (
            <div>
                <h1>LISTE DE PRODUITS</h1>
                <div>
                    {this.state.resultat.map((e, i) =>
                        <div className="produits">
                            <h2 className="listes" key={i}>- {e.name}</h2>
                            <div className="barre_button">
                                <form onSubmit={this.changeName}>
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
                <form onSubmit={this.handleAdd}>
                    <input
                        name="add"
                        className="liste_input_add"
                        placeholder="Ajouter un rpoduit"
                    >
                    </input>
                    <input
                        name="add2"
                        className="liste_input_add"
                        placeholder="Category"
                    >
                    </input>
                    <button
                        onClick={this.handleClick}
                        className="butt_product"
                    >
                        Ajouter
            </button>
                </form>
            </div>
        )
    }
}

export default LIsteProduits;
