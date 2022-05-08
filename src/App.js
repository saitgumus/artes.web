import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Distributor from "./components/Distributor";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/distributor" component={Distributor} />
        </Switch>
      </Layout>
    );
  }
}
