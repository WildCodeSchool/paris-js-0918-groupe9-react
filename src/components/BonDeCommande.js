import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../helper/tokenHelper';
import ClubHeader from './ClubHeader'
import '../CSS/BonDeCommande.scss';

class BonDeCommande extends Component {
  state = {
    product_id: "",
    product: "",
    color: "",
    size: "",
    quantity: 1,
    productsLine: [],
    isLoaded: false,
    productsList: [],
    contractId: "",
    deliveryAdress: ""
  }
  componentDidMount() {
    const url = `http://localhost:3030/contract_has_product/${this.props.match.params.id}`
    axios({
      method: "GET",
      url: url,
      headers: getToken()
    })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            productsList: result.data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }
  onClick = (event) => {
    if (this.state.product !== "" && this.state.color !== "" && this.state.size !== "" && this.state.quantity >= 1) {
      console.log(this.state.deliveryAdress)
      this.setState({
        productsLine: this.state.productsLine.concat({
          product_id: this.state.product_id,
          product: this.state.product,
          color: this.state.color,
          size: this.state.size,
          quantity: this.state.quantity,
          deliveryAdress: this.state.deliveryAdress
        })
      })
    }
    else {
      alert("Remplir tous les champs avant d'ajouter la ligne de commande.")
    }
  }
  handleProduct = (event) => {
    this.setState({
      [event.target.name]: event.target.value.split(",")[0],
      product_id: event.target.value.split(",")[1]
    })
  }
  handleDelete = (index) => {
    this.setState({
      productsLine: this.state.productsLine.filter((el, i) => i !== index)
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    if (this.state.productsLine.length !== 0) {
      alert('La commande a été validée.');
      event.preventDefault();
      const url = `http://localhost:3030/order/${this.props.match.params.id}`;
      axios.post(url, { products: this.state.productsLine }, { headers: getToken() });
      this.props.history.push(`/club-convention/${this.props.match.params.id}`)
    }
    else {
      alert('Veuillez remplir au moins une commande.')
    }
  }
  render() {
    const couleur = ["Rouge", "Vert", "Bleu", "Orange"]
    const taille = ["XSS", "XS", "S", "M", "L", "XL", "XXL", "25/7.5", "26/8.5", "27/9", "28/10", "29/11", "30/11.5", "31/12.5", "32/13", "33/1", "34/2", "35/2.5", "36/3.5", "37/4", "38/5", "39/6", "40/6.5", "41/7.5", "42/8", "43/9", "44/9.5", "45/10.5", "46/11", "47/12", "48/13"]
    if (this.state.isLoaded) {
      return (
        <div>
          <ClubHeader />
          <div className='bondecommande'>
            <h2>Bon de commande</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                <h4>Adresse de livraison </h4>
                <input type="text" name="deliveryAdress" onChange={this.handleChange} />
              </label>
              <br />
              <div className="lign">
              <div>
              <select name="product" onChange={this.handleProduct}>
                <option></option>
                {this.state.productsList.map((el, index) => <option value={[el.name, el.product_id]} key={index}>{el.name}</option>)}
              </select>
              <select name="color" onChange={this.handleChange}>
                <option></option>
                {couleur.map((el, index) => <option value={el} key={index}>{el}</option>)}
              </select>
              <select name="size" onChange={this.handleChange}>
                <option></option>
                {taille.map((el, index) => <option value={el} key={index}>{el}</option>)}
              </select>
              </div>
              <label>
                <input className="quantité" type="Number" min="1" value={this.state.quantity} name="quantity" onChange={this.handleChange} />
              </label>
              </div>
              <button className="butt-submit2" type="button" onClick={this.onClick}> Ajouter la ligne </button><br />
              <table>
                <tbody>
                  <tr>
                    <th>
                      <h4>Produit</h4>
                    </th>
                    <th>
                      <h4>Couleur</h4>
                    </th>
                    <th>
                      <h4>Taille</h4>
                    </th>
                    <th>
                      <h4>Quantité</h4>
                    </th>
                    <th>
                      <h4>Supprimer</h4>
                    </th>
                  </tr>
                  {
                    this.state.productsLine.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <h4> {
                            p.product
                          }</h4>
                        </td>
                        <td>
                          <h4>{
                            p.color
                          } </h4>
                        </td>
                        <td>
                          <h4> {
                            p.size
                          }</h4>
                        </td>
                        <td>
                          <h4>
                            {
                              p.quantity
                            }
                          </h4>
                        </td>
                        <td>
                          <button onClick={() => this.handleDelete(index)}>
                            🗑️
                      </button>
                        </td>
                      </tr>
                    )
                    )
                  }
                </tbody>
              </table>
              <button className="butt-submit" type="button" onClick={this.handleSubmit} > Valider la commande </button><br />
            </form>
          </div>
        </div>
      )
    }
    return (
      <div>
        Chargement...
      </div>
    )
  }

}
export default BonDeCommande