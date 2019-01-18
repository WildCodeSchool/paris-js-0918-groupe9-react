import React, { Component } from 'react';
import '../CSS/ClubHeader.css';
import logo from '../images/logoAllsponsored.png';
import { Link } from 'react-router-dom';
import iconHome from '../images/iconHome.svg';
import iconUser from '../images/iconUser.svg';


class ClubHeader extends Component {
    render() {
        return (
            <div className="ClubHeader">
                <img className="logo-allsponsored" src={logo} alt="logo allsponsored" />
                <div className="menu">
                    <Link className="icon" to='/club-home'><img src={iconHome} alt="icon home" /></Link>
                    <Link className="icon" to='/admin-parameters'><img src={iconUser} alt="icon User" /></Link>
                </div>
            </div>

        )
    }
}
export default ClubHeader;