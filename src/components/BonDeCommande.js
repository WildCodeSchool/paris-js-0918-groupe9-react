import React, { Component } from 'react';
import axios from 'axios';
import ClubHeader from './ClubHeader'
import '../CSS/AdminParameters.css';


class BonDeCommande extends Component {
  state = {
    product_id: "",
    product : "",
    color : "",
    size : "",
    quantity : 1,
    productsLine : [],
    isLoaded: false,
    productsList : [],
    contractId : "",
    command : []
  }
  componentDidMount() {
    const url=`http://localhost:3030/contract_has_product/${this.props.match.params.id}`
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
    if (this.state.product!=="" && this.state.color!=="" && this.state.size!=="" && this.state.quantity>=1)
    {
    this.setState({productsLine: this.state.productsLine.concat({
      product_id : this.state.product_id,
      product : this.state.product,
      color : this.state.color, 
      size : this.state.size,
      quantity : this.state.quantity
    })})
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
  handleDelete=(index)=>{
    this.setState({
      productsLine : this.state.productsLine.filter((el, i)=>i!==index)
    })
  }
  handleChange=(event) =>{
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit=(event)=>{
    if (this.state.productsLine.length !== 0) {
      console.log(this.state.product_id)
    alert('La commande a été validée.');
    event.preventDefault();
    const url = `http://localhost:3030/order/${this.props.match.params.id}`;
    axios.post(url,{product: this.state.productsLine});
    } 
    else {
      alert('Veuillez remplir au moins une commande.')
    }
  }
 
    render() {
      const couleur = ["Rouge","Vert","Bleu","Orange"]
      const taille = ["XS","S","M","L","XL","XXL","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48"]
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
                        p.product
                      }
                    </td>
                    <td>
                      {
                        p.color
                      }
                    </td>
                    <td>
                      {
                        p.size
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
            <select name="product" onChange={this.handleProduct}>
              <option></option>
              { this.state.productsList.map((el , index) => <option value={[el.name, el.product_id]} key={index}>{el.name}</option>)} 
            </select>
            <select name="color" onChange={this.handleChange}>
              <option></option>
              {couleur.map((el, index) => <option value={el} key={index}>{el}</option>)}
            </select>
            <select name="size" onChange={this.handleChange}>
              <option></option>
              {taille.map((el, index) => <option value={el} key={index}>{el}</option>)}
            </select>
            <label>
              Quantité:
              <input type="Number" min="1" value={this.state.quantity} name="quantity" onChange={this.handleChange} />
            </label>
            <button type="button" onClick={this.onClick}> + </button><br />
            <button type="button" onClick={this.handleSubmit} > Valider la commande </button>
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