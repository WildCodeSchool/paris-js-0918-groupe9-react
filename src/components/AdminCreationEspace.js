import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import AdminHeader from './AdminHeader';

export default class AdminCreationEspace extends Component {
    generateur = (max) => {
        let motdepass = '';
        const lettre = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (let i = 0; i < max; i++) {
            motdepass = motdepass + lettre[Math.floor(Math.random() * (lettre.length - 1))]
        }
        return motdepass
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault()
    }
    render() {
        return (
            <div>
                <AdminHeader />
                <h2>Creation espace pour club </h2>
                <MuiThemeProvider>
                    <Grid container
                        alignItems='center'
                        style={{ height: '100%' }}
                        justify='center'>
                        <form onSubmit={this.handleOnSubmit}>
                            <TextField type="text" name="email" placeholder="email">
                            </TextField>
                            <br />
                            <TextField type="password" name="password" placeholder="mot de pass">
                            </TextField>
                            <br />
                            <br />
                            <Button variant="contained" color="primary" type="submit"> Envoyer </Button>
                        </form>
                    </Grid>
                </MuiThemeProvider>

            </div>





        )
    }
}