import React, { Component } from "react";
import axios from "axios";
import "../CSS/Order_render.scss";

class Order_render extends Component {
  state = {
    productsDetails: []
  };

  async componentDidMount() {
    const results = await axios.get(`http://localhost:3030/order/${this.props.match.params.id}/details`);
    const data = results.data;
    this.setState({
      productsDetails: data
    });
  }

  render() {
    console.log(this.state.productsDetails);
    return (
      <div className="order_render">
        <table>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Couleur</th>
            <th>Taille</th>
          </tr>
          {this.state.productsDetails.length !== 0
            ? this.state.productsDetails.map((e, i) => (
                  <tr key={i}>
                    <td>{e.productName}</td>
                    <td>{e.quantity}</td>
                    <td>{e.color}</td>
                    <td>{e.size}</td>
                  </tr>
              ))
            : null}
        </table>
      </div>
    );
  }
}

export default Order_render;
