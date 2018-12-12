import React, { Component } from 'react';
<<<<<<< HEAD
import './App.css';
import Espace_admin from './components/Espace_admin';
=======
import { Route, BrowserRouter, Switch, NavLink, Redirect } from 'react-router-dom';
>>>>>>> dd31b7cc555bf41b225bb663a298b67c35ddacce


import LoginClub from './components/LoginClub';
import ClubHome from './components/ClubHome';
import AdminSponsore from './components/AdminSponsore';
import LoginAdmin from './components/LoginAdmin';
import AdminHome from './components/AdminHome';
import AdminClub from './components/AdminClub'
class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
       <Espace_admin />
=======
        <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/" component={LoginClub} />
                  <Route path="/admin" component={LoginAdmin} />
                  <Route path="/adminhome" component={AdminHome} />
                  <Route path="/clubhome" component={ClubHome} />
                  <Route path="/AdminSponsored" component={AdminSponsore} />
                  <Route path="/AdminClub" component={AdminClub} />
                </Switch>
              </div>
            </BrowserRouter>
>>>>>>> dd31b7cc555bf41b225bb663a298b67c35ddacce
      </div>
    );
  }
}

export default App;
