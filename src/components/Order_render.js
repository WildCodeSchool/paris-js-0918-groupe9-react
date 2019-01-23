import React, { Component } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../CSS/Order_render.scss";
import { getToken } from "../helper/tokenHelper";

class Order_render extends Component {
  state = {
    productsDetails: []
  };

 componentDidMount() {
    axios.get(`http://localhost:3030/order/${this.props.match.params.id}/details`,{headers:getToken()})
    .then (res => res.data)
    .then (
      data  =>this.setState({
      productsDetails: data
    })
    )
    
  }
  // pour imprimer la page en PDF
  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  }

  render() {
    console.log(this.state.productsDetails);
    return (
      <div className="order_render">
        <div className="mb5">
          <button onClick={this.printDocument}>Print</button>
        </div>
        <div id="divToPrint" className="mt4">
          <p>Adresse de livraison: {this.state.productsDetails.length !== 0 ? this.state.productsDetails[0].delivery_address : null}</p>
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

      </div>
    );
  }
}

export default Order_render;
