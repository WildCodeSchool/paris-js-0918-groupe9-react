import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AdminHeader from './AdminHeader';
import '../CSS/AdminSponsore.css'

// const styles = theme => ({
//     root: {
//         width: '100%',
//         maxWidth: 720,
//         backgroundColor: theme.palette.background.paper,
//     },
//     nested: {
//         paddingLeft: theme.spacing.unit * 4,
//     },
// });

class AdminSponsore extends Component {
    state = {
        name: undefined,
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

        fetch('http://localhost:3030/project/')
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
        fetch('http://localhost:3030/project_has_sponsor/')
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
    // handleClick = (e, index) => {
    //     const collapseIndex = this.state.collapseIndex;
    //     const currentValue = collapseIndex[index];
    //     collapseIndex[index] = !currentValue;
    //     this.setState(state => ({ collapseIndex }));

    // };
    handleCreationProjet = () => {
        this.props.history.push('/admin-creation-projetglobal')
    }

    handleOnClick = (index) => {
        this.props.history.push(`/admin-project/${index}`)
    }
    handleCreationSponsor = (e) => {
        // e.preventDefault()
        axios.post("http://localhost:3030/sponsor", {
            name: e.target.sponsor.value,
        })
            .then((res) => {
                if (res.status == 200) {
                    alert('Un sponsor est ajouté');

                }
                else if (res.status == 204) {
                    console.log("error");
                    alert("error")
                }
                else {
                    console.log("error");
                    alert("error");
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

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
                    {/* <List component="nav"
                        subheader={<ListSubheader component="div">List sponsor - project</ListSubheader>}
                        className={classes.root}>
                        {sponsors.map((sponsor, index) => <ListItem button onClick={e => this.handleClick(e, index)}>
                            <ListItemText inset primary={sponsor.name} />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                            <Collapse in={this.state.collapseIndex[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {this.state.projetsBySponsorId[sponsor.id].map((projet) =>
                                        <ListItem button className={classes.nested}>
                                            <ListItemAvatar>
                                                <Avatar alt={projet.name} src={projet.visual_shirt} />
                                            </ListItemAvatar>
                                            <ListItemText button inset primary={projet.name} />
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </ListItem>)}
                    </List> */}
                    <div className="sponsore">
                        <ul>
                            {sponsors.map(sponsor => (
                                <li className="sponsorname">{sponsor.name}
                                    <ul>
                                        {this.state.projetsBySponsorId[sponsor.id].map((projet) => (
                                            <li className="sponsorprojet" >
                                                <button  onClick={()=>this.handleOnClick(projet.id)}>{projet.name}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div >
                        <form onSubmit={this.handleCreationSponsor}>
                            <button className="buttonsponsor" type="submit">Ajouter un sponsor </button>
                            <input type="text" placeholder="nom de sponsor" name="sponsor" />
                        </form>
                    </div>
                    <div>
                        <button className="buttonprojet" onClick={this.handleCreationProjet}>Creer un projet global </button>
                    </div>

                </div >
            );
        }



    }
}
export default AdminSponsore;
//withStyles(styles)