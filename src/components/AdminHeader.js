import React, { Component } from 'react';
import '../CSS/AdminHeader.css';
import logo from '../images/logoAllsponsored.png';

import Grid from '@material-ui/core/Grid';
import IdentityIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 50,
    },
});
class AdminHeader extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="AdminHeader">
                <Grid container className={classes.root}>
                    <Grid item xs={6}>
                        <a href="http://allsponsored.com/"> <img src={logo} className="App-logo" alt="logo" href="http://allsponsored.com/" /> </a>
                    </Grid>
                    <Grid item xs={2} className={classes.icon}>
                    <HomeIcon fontSize="large"/>
                    </Grid>
                    <Grid item xs={2} className={classes.icon}>
                        <IdentityIcon className="iconIdentity" fontSize="large" />
                    </Grid>
                </Grid>
            </div>

        )
    }
}
export default withStyles(styles)(AdminHeader);