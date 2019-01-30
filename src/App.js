import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import LoginClub from "./components/LoginClub";
import ClubHome from "./components/ClubHome";
import AdminSponsore from "./components/AdminSponsore";
import LoginAdmin from "./components/LoginAdmin";
import AdminHome from "./components/AdminHome";
import AdminClub from "./components/AdminClub";
import AdminCreationEspace from "./components/AdminCreationEspace";
import AjouteProjet_Club from "./components/AjouteProjet_Club";
import AdminProject from "./components/AdminProject";
import CreationProjetGlobal from "./components/CreationProjetGlobal";
import AdminParameters from "./components/AdminParameters";
import Order_render from "./components/Order_render";
import ClubConvention from "./components/ClubConvention";
import AdminTousClubs from "./components/AdminTousClubs";
import AdminGestionProjet from "./components/AdminGestionProjet";
import LIsteProduits from "./components/LIsteProduits";
import BonDeCommande from "./components/BonDeCommande";
import NotFound from "./components/NotFound";
import ClubList from "./components/ClubList";

import MDP from "./components/MDP";
import ClubParameters from "./components/ClubParameters";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginClub} />
            <Route path="/admin" component={LoginAdmin} />
            <Route path="/admin-home" component={AdminHome} />
            <Route path="/club-home" component={ClubHome} />
            <Route path="/club-parameters/:id" component={ClubParameters} />

            <Route path="/club-convention/:id" component={ClubConvention} />

            <Route path="/admin-sponsor" component={AdminSponsore} />
            <Route path="/admin-club/:id" component={AdminClub} />
            <Route
              path="/admin-creation-espace"
              component={AdminCreationEspace}
            />
            <Route path="/ajoute-projet-club" component={AjouteProjet_Club} />
            <Route
              path="/admin-creation-projetglobal"
              component={CreationProjetGlobal}
            />
            <Route path="/admin-project/:id" component={AdminProject} />
            <Route path="/admin-parameters" component={AdminParameters} />
            <Route path="/admin-tous-clubs" component={AdminTousClubs} />
            <Route
              path="/admin-gestion-projet"
              component={AdminGestionProjet}
            />

            <Route path="/liste-produits" component={LIsteProduits} />
            <Route path="/bon-de-commande/:id" component={BonDeCommande} />
            <Route path="/order-render/:id" component={Order_render} />

            <Route path="/club-list/:id" component={ClubList} />

            <Route path="/MDP" component={MDP}/>

            <Route component={NotFound} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
