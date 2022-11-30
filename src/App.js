import React, {Component} from "react";
import {Route, Switch} from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import DeviceComponent from "./components/Device";
import UserScreen from "./components/User/User.screen";
import Dashboard from "./components/Dashboard";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/hotel" component={Home}/>
                    <Route path="/device" component={DeviceComponent}/>
                    <Route path="/user" component={UserScreen}/>
                </Switch>
            </Layout>
        );
    }
}
