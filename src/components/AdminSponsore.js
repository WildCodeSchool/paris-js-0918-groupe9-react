import React, { Component } from 'react';

import AdminHeader from './AdminHeader'


class AdminSponsore extends Component {
    state = {
        open: true,
        isLoaded: false,
        error: null,
        sponsors: [],
        projets: [],
        projetsSponsors: [],
        projetsBySponsorId: {},
        selectedSponsor: undefined,
        collapseIndex: []
    }
    componentDidMount() {
        fetch('http://localhost:3030/sponsor/')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        sponsors: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })

        fetch('http://localhost:3030/api/project/')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        projets: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })

        fetch('http://localhost:3030/api/project_has_sponsor/')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        projetsSponsors: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                })

    }
    handleClick = (e, index) => {
        const collapseIndex = this.state.collapseIndex;
        const currentValue = collapseIndex[index];
        collapseIndex[index] = !currentValue;
        this.setState(state => ({ collapseIndex }));

    };

    render() {
        const { classes } = this.props;
        const { error, isLoaded, sponsors } = this.state;
        const isFullyLoaded = this.state.sponsors.length > 0
            && this.state.projets.length > 0
            && this.state.projetsSponsors.length > 0;

        if (error) {
            return (
                <div>
                    Error:{error.message}
                </div>
            );
        }
        if (!isLoaded && !isFullyLoaded) {
            return <div> Loading... </div>;
        }
        if (isFullyLoaded) {
            this.state.sponsors.forEach(sponsor => {
                this.state.projetsBySponsorId[sponsor.id] = [];
                this.state.collapseIndex.push(false);
            });
            this.state.projetsSponsors.forEach(projetsSponsor => {
                const project_id = projetsSponsor.project_id;
                const project = this.state.projets.filter(p => p.id === project_id)[0];
                const sponsor_id = projetsSponsor.sponsor_id;
                const array = this.state.projetsBySponsorId[sponsor_id];
                array.push(project);
            });
            return (
                <div>
                    <AdminHeader />
                   
                    <div>
                        <ul>
                            {sponsors.map(sponsor => (
                                <li>{sponsor.name}
                                    <ul>
                                        {this.state.projetsBySponsorId[sponsor.id].map((projet) => (
                                            <li>
                                                <button>{projet.name}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div >
            );
        }



    }
}
export default AdminSponsore;