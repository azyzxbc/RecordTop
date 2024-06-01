import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Template from "./components/template";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Template data="dashboard" />
        </Route>
        <Route exact path="/capteurs">
          <Template data="capteurs" />
        </Route>
        <Route exact path="/historique">
          <Template data="historique" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
