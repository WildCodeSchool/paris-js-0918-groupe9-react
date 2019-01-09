import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import LoginClub from './components/LoginClub';
import ClubHome from './components/ClubHome';
import AdminSponsore from './components/AdminSponsore';
import LoginAdmin from './components/LoginAdmin';
import AdminHome from './components/AdminHome';
import AdminClub from './components/AdminClub';
import AdminCreationEspace from './components/AdminCreationEspace';
import AjouteProjet_Club from './components/AjouteProjet_Club';
import AdminProject from './components/AdminProject';
import CreationProjetGlobal from './components/CreationProjetGlobal';
import AdminParameters from './components/AdminParameters';

import ClubConvention from './components/ClubConvention';


import AdminTousClubs from './components/AdminTousClubs';  
import AdminGestionProjet from'./components/AdminGestionProjet';
import LIsteProduits from './components/LIsteProduits';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={LoginClub} />
                  <Route path="/admin" component={LoginAdmin} />
                  <Route path="/adminhome" component={AdminHome} />
                  <Route path="/clubhome" component={ClubHome} />

                  <Route path="/ClubConvention" component={ClubConvention} />

                  <Route path="/admin-sponsor" component={AdminSponsore} />
                  <Route path="/admin-club/:id" component={AdminClub} />
                  <Route path="/admin-creation-espace" component={AdminCreationEspace} />
                  <Route path="/ajoute-projet-club" component={AjouteProjet_Club}/>
                  <Route path="/admin-creation-projetglobal" component={CreationProjetGlobal}/>
                  <Route path="/admin-project/:id" component={AdminProject}/>
                  <Route path="/admin-parameters" component={AdminParameters} />
                  <Route path="/admin-tous-clubs" component={AdminTousClubs}/>
                  <Route path="/admin-gestion-projet" component={AdminGestionProjet}/>

                  <Route path="/liste-produits" component={LIsteProduits}/>                  
                  
                </Switch>
            </BrowserRouter>
            
      </div>
    );
  }
}

export default App;
