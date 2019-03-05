import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

let RouterApp = withRouter(App);

ReactDOM.render(
  <BrowserRouter>
    <RouterApp />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
