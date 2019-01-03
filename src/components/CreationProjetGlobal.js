import React, { Component } from 'react';
import axios from 'axios';
import { getToken, getClubId } from '../helper/tokenHelper';

import AdminHeader from './AdminHeader';
import '../CSS/CreationProjetGlobal.scss'

class CreationProjetGlobal extends Component {
    state = {
        isLoaded: false,
        sponsor_id: undefined,
        name: undefined,
        user_id: 1,
        status: "active",
        file: undefined,
        visual_shirt: undefined,
        url_summary: undefined
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
        this.setState({ file: e.target.files[0] });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { sponsor_id, name, user_id,url_summary, visual_shirt} = this.state;
        const body = {
            name,
            user_id,
            sponsor_id,
            status: "active",
            visual_shirt,
            url_summary

        };
        axios.post("http://localhost:3030/project", body)
            .then((res) => {
                if (res.status == 200) {
                    alert("Un projet global est créé");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    handleUpload = (e) => {
        const key  = e.target.name;
        const formdata = new FormData()
        formdata.append('file', this.state.file)
        axios({
            method: 'post',
            url: 'http://localhost:3030/project/uploaddufichier',
            data: formdata,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((res) => {
                if (res.status == 200) {
                    alert("Fichiers uploadé");
                    this.setState({
                        [key] : res.data
                    })
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
                        <label>
                            <h4>Resumé de projet </h4>
                            <input type="file" name="file" accept=".pdf" onChange={this.onChangeFile} /> <br />
                            <button name="url_summary" onClick={this.handleUpload}>Upload</button>
                        </label> <br />
                        <label>
                            <h4> Visuel de produit</h4>
                            <input type="file" name="file" accept=".png,.pdf,.jpeg" onChange={this.onChangeFile} /> <br />
                            <button name="visual_shirt"  onClick={this.handleUpload}>Upload</button>
                        </label> <br />
                        <form className="formulaire" onSubmit={this.handleOnSubmit} >
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