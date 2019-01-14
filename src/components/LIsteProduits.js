import React, { Component } from "react";
import "../CSS/ListeProduits.css";
import axios from "axios";
import AdminHeader from "./AdminHeader";

class LIsteProduits extends Component {
  state = {
    resultat: [],
    success: false
  };

  handleAdd = e => {
    // e.preventDefault()
    console.log(e.target.add.value);
    if (e.target.add.value.length > 0 && e.target.add.value !== " ") {
      const id = e.target.add.id;
      const url = `http://localhost:3030/product/${id}`;
      axios.post(url, {
        name: e.target.add.value,
        category: e.target.add2.value
      });
    }
  };

  componentDidMount = () => {
    axios.get("http://localhost:3030/product/").then(res =>
      this.setState({
        resultat: res.data
      })
    );
  };

  changeName = e => {
    console.log(e.target.butt.value);
    if (e.target.butt.value.length > 0 && e.target.butt.value !== " ") {
      const id = e.target.butt.id;
      const url = `http://localhost:3030/product/${id}`;
      axios.put(url, {
        name: e.target.butt.value
      });
    }
  };

  handleClick = () => {
    this.setState({
      success: true
    });
  };

  render() {
    return (
      <div>
        <AdminHeader />
        <h1>LISTE DE PRODUITS</h1>
        <div>
          {this.state.resultat.map((e, i) => (
            <div className="produits">
              {/* <h2 className="listes" key={i}>
                - {e.name}
              </h2> */}
              <div className="barre_button">
                <div>
                  <form onSubmit={this.changeName}>
                    <input
                      className="liste_input"
                      id={e.id}
                      name="butt"
                      placeholder={e.name}
                    />
                    <button className="modif" onClick={this.handleClick}>
                      MODIFIER
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="produit_ajout">Ajouter un produit</h2>
        <div className="input_product_add">
          <form onSubmit={this.handleAdd}>
            <input
              name="add"
              className="liste_input_add"
              placeholder="Ajouter un rpoduit"
            />
            <input
              name="add2"
              className="liste_input_add"
              placeholder="Category"
            />
            <button onClick={this.handleClick} className="butt_product">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LIsteProduits;
