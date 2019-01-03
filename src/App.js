import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink, Redirect } from 'react-router-dom';
import LoginClub from './components/LoginClub';
import ClubHome from './components/ClubHome';
import AdminSponsore from './components/AdminSponsore';
import LoginAdmin from './components/LoginAdmin';
import AdminHome from './components/AdminHome';
import AdminClub from './components/AdminClub';
import AdminParameters from './components/AdminParameters';
import ClubConvention from './components/ClubConvention';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/" component={LoginClub} />
                  <Route path="/admin" component={LoginAdmin} />
                  <Route path="/adminhome" component={AdminHome} />
                  <Route path="/adminparameters" component={AdminParameters} />
                  <Route path="/clubhome" component={ClubHome} />
                  <Route path="/AdminSponsored" component={AdminSponsore} />
                  <Route path="/AdminClub" component={AdminClub} />
                  <Route path="/ClubConvention" component={ClubConvention} />
                </Switch>
              </div>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
