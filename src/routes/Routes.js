import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "pages/admin/login/Login";
import Chamadas from "pages/chamadas/Chamadas";

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/notifications" component={Chamadas} />
    <Route component={Chamadas} />
  </Switch>
);

export default Routes;
