import React, { Component } from 'react';
import '../CSS/AdminHeader.css';
import logo from '../images/logoAllsponsored.png';
import { Link } from 'react-router-dom';
import iconHome from '../images/iconHome.svg';
import iconUser from '../images/iconUser.svg';


class AdminHeader extends Component {
    render() {
        return (
            <div className="AdminHeader">
                <img className="logo-allsponsored" src={logo} alt="logo allsponsored" />
                <div className="menu">
                    <Link className="icon" to='/adminhome'><img src={iconHome} alt="icon home" /></Link>
                    <Link className="icon" to='/admin-parameters'><img src={iconUser} alt="icon User" /></Link>
                </div>
            </div>

        )
    }
}
export default AdminHeader;