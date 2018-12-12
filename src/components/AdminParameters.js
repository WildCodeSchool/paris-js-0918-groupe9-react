import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import '../CSS/AdminParameters.css';


class AdminParameters extends Component {

  state={
    identifiantState: false,
    adresseState: false,
    telephoneState: false,
    emailState: false
  }

  toggle = (e) => {
    this.setState({
      [e.target.name] :  !this.state[e.target.name]
    })
  }

  render() {
    return (
      <div>
        <AdminHeader />
        <div className="groupe-input">
          <button name="identifiantState" onClick={this.toggle}>Identifiant</button><br />
          {this.state.identifiantState ? ( 
            <div>
          <input placeholder="mot de passe"/><br />
          <p>Cette section vous permet de changer votre mot de passe</p>
          <input placeholder="nouveau mot de passe"/><input placeholder="confirmer votre mot de passe"/><br /><br />
          <button name="identifiantState"  className="valider" onClick={this.toggle}>Valider</button><hr/><br /> </div>): null
        }
          
          <button name="adresseState" onClick={this.toggle}>Adresse</button><br />
          {this.state.adresseState ? (
            <div>
              <input placeholder="nouvealle adresse"/><br /><br />
              <button name="adresseState"  className="valider" onClick={this.toggle}>Valider</button><hr/><br />
            </div>) : null
          }
          <button name="telephoneState" onClick={this.toggle}>Téléphone</button><br />
          {this.state.telephoneState ? (
            <div>
              <input placeholder="nouveau numéro de téléphone"/><br /><br />
              <button name="telephoneState"  className="valider" onClick={this.toggle}>Valider</button><hr/><br />
            </div>) : null
          }
          <button name="emailState" onClick={this.toggle}>Email</button><br />
          {this.state.emailState ? (
            <div>
              <input placeholder="nouvelle adresse email"/><br /><br />
              <button name="emailState"  className="valider" onClick={this.toggle}>Valider</button><hr/><br />
            </div>) : null
          }
        </div>
      </div>
    )
  }
}

export default AdminParameters;
