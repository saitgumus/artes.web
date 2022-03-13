import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configure-store";
import "alertifyjs/build/css/alertify.css";
import "react-datasheet-grid/dist/index.css";
import Alertify from "alertifyjs";

Alertify.set("notifier", "position", "bottom-center");
//import registerServiceWorker from "./registerServiceWorker";

//const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

// optional cofiguration
const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale",
};

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </BrowserRouter>,
  rootElement
);

//registerServiceWorker();
