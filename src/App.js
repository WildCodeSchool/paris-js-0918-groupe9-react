import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink, Redirect } from 'react-router-dom';

import LoginClub from './components/LoginClub';
import GenericModelCRUD from './components/GenericModelCRUD';
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
import AdminTousClubs from './components/AdminTousClubs';  
import AdminGestionProjet from'./components/AdminGestionProjet';
class App extends Component {
  render() {
    const mappings = [
      { name: "last_name", type: "text" },
      { name: "first_name", type: "text" },
      { name: "email", type: "text" },
      { name: "password", type: "password" },
    ];
    const model = {
      id: undefined,
      last_name: undefined,
      first_name: undefined,
      email: undefined,
      password: undefined
    };
    const table = "user";
    return (
      <div className="App">
        <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={LoginClub} />
                  <Route path="/admin" component={LoginAdmin} />
                  <Route path="/adminhome" component={AdminHome} />
                  <Route path="/clubhome" component={ClubHome} />
                  <Route path="/admin-sponsor" component={AdminSponsore} />
                  <Route path="/admin-club/:id" component={AdminClub} />
                  <Route path="/admin-creation-espace" component={AdminCreationEspace} />
                  <Route path="/ajoute-projet-club" component={AjouteProjet_Club}/>
                  <Route path="/admin-creation-projetglobal" component={CreationProjetGlobal}/>
                  <Route path="/admin-project/:id" component={AdminProject}/>
                  <Route path="/admin-parameters" component={AdminParameters} />
                  <Route path="/admin-tous-clubs" component={AdminTousClubs}/>
                  <Route path="/admin-gestion-projet" component={AdminGestionProjet}/>
                  
                </Switch>
            </BrowserRouter>
        {/* <GenericModelCRUD
          mappings={mappings} model={model} table={table}
        /> */}
      </div>
    );
  }
}

export default App;
