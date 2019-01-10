import React, { Component } from 'react';
import axios from 'axios';

import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/CreationProjetGlobal.scss'
import { EditorFormatIndentDecrease } from 'material-ui/svg-icons';

class CreationProjetGlobal extends Component {
    state = {
        isLoaded: false,
        sponsor_id: undefined,
        name: undefined,
        user_id: 1,
        status: "active",
        file1: undefined,
        file2: undefined,
        visual_shirt: undefined,
        url_summary: undefined,
    }

    componentDidMount() {
        const url = "http://localhost:3030/sponsor"
        axios({
            method: "GET",
            url: url,
            headers: getToken()
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        sponsors: result.data,
                        sponsor_id: result.data[0].id
                    });
                    console.log(result.data);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    };

    handleOnChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeFile = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    handleUpload = (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('file1', this.state.file1);
        formdata.append('file2', this.state.file2);
        formdata.append('sponsor_id', this.state.sponsor_id);
        formdata.append('user_id', this.state.user_id);
        formdata.append('status', this.state.status);
        formdata.append('name', this.state.name)
        axios({
            method: 'post',
            url: 'http://localhost:3030/project/uploaddesfichier',
            data: formdata,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("Fichiers uploadé");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <div>
                        <AdminHeader />
                    </div>
                    <div className="projetglobal">
                        <p>Initialisation un projet global</p>
                        <form className="formulaire" onSubmit={this.handleUpload} encType="multipart/form-data">
                            <label>
                                <h4>Sponsor </h4>
                                <select name="sponsor_id" value={this.state.sponsor_id} onChange={this.handleOnChange} >
                                    {this.state.sponsors.map(sponsor => (
                                        <option value={sponsor.id}>{sponsor.name}</option>
                                    ))}
                                </select>
                            </label> <br />
                            <label>
                                <h4>Nom de projet</h4>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleOnChange} />
                            </label> <br />
                            <h4> Visuel de produit</h4>
                            <input type="file" name="file2" accept=".png,.pdf,.jpeg" onChange={this.onChangeFile} /> <br />
                            <h4>Resumé de projet </h4>
                            <input type="file" name="file1" accept=".pdf" onChange={this.onChangeFile} /> <br />
                            <button type="submit" value="Submit"> envoyer </button>
                        </form>
                    </div>
                </div>

            )
        } else {
            return (<div>Loading...</div>);
        }

    }
}
export default CreationProjetGlobal;