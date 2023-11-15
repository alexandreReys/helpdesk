import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "pages/admin/login/Login";
import Chamadas from "pages/chamadas/Chamadas";
import ChamadasForm from "pages/chamadas-form/ChamadasForm";
import ChamadasAdd from "pages/chamadas-add/ChamadasAdd";
import ClientesForm from "pages/clientes-form/ClientesForm";
import PhoneSearch from "pages/phone-search";
import ChamadasHistoricoSearch from "pages/chamadas-historico-search/ChamadasHistoricoSearch";

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/notifications" component={Chamadas} />
    <Route exact path="/form/:evento" component={ChamadasForm} />
    <Route exact path="/add/:evento" component={ChamadasAdd} />
    <Route exact path="/chamadas-historico-search" component={ChamadasHistoricoSearch} />
    <PrivateRoute path="/clientes-form" component={ClientesForm} />
    <PrivateRoute path="/phone-search" component={PhoneSearch} />
    <PrivateRoute component={Chamadas} />
  </Switch>
);

export default Routes;
