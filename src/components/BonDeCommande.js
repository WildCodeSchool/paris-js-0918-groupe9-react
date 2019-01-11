import React, { Component } from 'react';
import axios from 'axios';
import ClubHeader from './ClubHeader'
import '../CSS/AdminParameters.css';


class BonDeCommande extends Component {
  state = {
    products : "",
    colors : "",
    sizes : "",
    quantity : 1,
    productsLine : [],
    isLoaded: false,
    productsList : [],
    contractId : ""
  }
  //axios.get("http:localhost:3030/contract_has_product/:idcontrat"
  componentDidMount() {
    const url=`http://localhost:3030/contract_has_product/1`
    axios({
      method : "GET",
      url : url
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
  onClick=(event)=>{
    if (this.state.products!=="" && this.state.colors!=="" && this.state.sizes!=="" && this.state.quantity>=1)
    {
    this.setState({productsLine: this.state.productsLine.concat({
      products : this.state.products,
      colors : this.state.colors, 
      sizes : this.state.sizes,
      quantity : this.state.quantity
    })})
    }
    else {
      alert("Remplir tous les champs avant d'ajouter la ligne de commande.")
    }
  }
  handleDelete=(index)=>{
    this.setState({
      productsLine : this.state.productsLine.filter((el, i)=>i!==index)
    })
  }
  handleChange=(event) =>{
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit=(event)=>{
    alert('La commande a été validée.');
    event.preventDefault();
    const url = "http://localhost:3030/order_has_product";
    axios.post(url,{products: this.state.productsLine});
  }
    render() {
      console.log(this.props.match.params.id)
      const produits = []
      const couleurs = ["Rouge","Vert","Bleu","Orange"]
      const taille = ["XS","S","M","L","XL","XXL"]
      if (this.state.isLoaded) {
      return(
        <div>
          <ClubHeader/>
          <table>
            <tbody>
              <tr>
              <th>
                  Produit
                </th>
                <th>
                  Couleur
                </th>
                <th>
                  Taille
                </th>
                <th>
                  Quantité
                </th>
                <th>
                  Action
                </th>
              </tr>
              {
                this.state.productsLine.map((p, index)=> (
                  <tr key={index}>
                    <td>
                      {
                        p.products
                      }
                    </td>
                    <td>
                      {
                        p.colors
                      }
                    </td>
                    <td>
                      {
                        p.sizes
                      }
                    </td>
                    <td>
                      {
                        p.quantity
                      }
                    <td>
                    </td>
                      <button onClick={()=>this.handleDelete(index)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                )
                )
            }
            </tbody>
          </table>
          <form onSubmit={this.handleSubmit}>
            <select name="products" onChange={this.handleChange}>
              <option></option>
              {this.state.productsList.map((el , index) => <option value={el} key={index}>{el}</option>)}
            </select>
            <select name="colors" onChange={this.handleChange}>
              <option></option>
              {couleurs.map((el, index) => <option value={el} key={index}>{el}</option>)}
            </select>
            <select name="sizes" onChange={this.handleChange}>
              <option></option>
              {taille.map((el, index) => <option value={el} key={index}>{el}</option>)}
            </select>
            <label>
              Quantité:
              <input type="Number" min="1" value={this.state.quantity} name="quantity" onChange={this.handleChange} />
            </label>
            <button type="button" onClick={this.onClick}> + </button><br />
            <button type="button" > Valider la commande </button>
          </form>
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