import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../helper/tokenHelper";
import AdminHeader from "./AdminHeader";
import "../CSS/AdminProject.scss";

class AdminProject extends Component {
  state = {
    isLoaded: false,
    error: null,
    projet: null,
    contracts: []
  };
  componentDidMount() {
    const projectUrl =
      "http://localhost:3030/project/" + this.props.match.params.id;
    const contractUrl =
      "http://localhost:3030/contract/project/" + this.props.match.params.id;
    const myInit =
    {
      method: 'GET',
      headers: getToken(),
    };
    fetch(projectUrl,myInit)
      .then(res => res.json())
      .then(
        result =>
          this.setState({
            isLoaded: true,
            projet: result
          }),
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    fetch(contractUrl,myInit)
      .then(res => res.json())
      .then(
        result =>
          this.setState({
            isLoaded: true,
            contracts: result
          }),
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleOnClick = id => {
    this.props.history.push(`/admin-club/${id}`);
  };

  render() {
    const { error, isLoaded, projet, contracts } = this.state;
    console.log(contracts);
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (this.state.projet === null) {
      return <div> Loading... </div>;
    }
    return (
      <div className="adminprojet">
        <AdminHeader />
        <table>
          <thead>
            <tr>
              <th>CLUB</th>
              <th>CONTRAT</th>
              <th>STATUS SIGNATURE</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => this.handleOnClick(contract.club_id)}>
                    {contract.clubName}
                  </button>
                </td>
                <td>{contract.name}</td>
                <td>
                  {contract.url_signed_contract ? (
                    <p> Contrat signé</p>
                  ) : (
                      <p> Contrat non signé</p>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/ajoute-projet-club?projetid=${projet[0].id}`}>
          <button>Ajouter un club au projet global</button>
        </Link>
      </div>
    );
  }
}

export default AdminProject;
