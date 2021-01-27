import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "pages/admin/login/Login";
import Chamadas from "pages/chamadas/Chamadas";
import ChamadasForm from "pages/chamadas-form/ChamadasForm";
import ChamadasAdd from "pages/chamadas-add/ChamadasAdd";
import ClientesForm from "pages/clientes-form/ClientesForm";

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/notifications" component={Chamadas} />
    <Route exact path="/form/:evento" component={ChamadasForm} />
    <Route exact path="/add/:evento" component={ChamadasAdd} />
    <PrivateRoute path="/clientes-form" component={ClientesForm} />
    <PrivateRoute component={Chamadas} />
  </Switch>
);

export default Routes;
