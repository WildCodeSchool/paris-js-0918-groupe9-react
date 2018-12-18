import React, { Component } from 'react';

import AdminHeader from './AdminHeader'


class AdminProject extends Component {
    state = {
        isLoaded: false,
        error: null,
        projet: null,
        contracts: []
    }
    componentDidMount() {
        const projectUrl = 'http://localhost:3030/project/' + this.props.match.params.id;
        const contractUrl = 'http://localhost:3030/contract/project/' + this.props.match.params.id;
        fetch(projectUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.state.projet = result[0];
                    return fetch(contractUrl);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        contracts: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })
    }
    render() {
        const { error, isLoaded, projet, contracts } = this.state;

        if (error) {
            return (
                <div>
                    Error:{error.message}
                </div>
            );
        }
        if (!isLoaded) {
            return <div> Loading... </div>;
        }
        return (<div>
            <AdminHeader />
            <h2>{projet.name}</h2>
            {contracts.map(contract => (<li>{contract.name}</li>))}
        </div>);
    }
}

export default AdminProject;