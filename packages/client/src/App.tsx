import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { TopicPage } from "./TopicPage";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/topics" component={HomePage} />
        <Route path="/topics/:id" component={TopicPage} />
      </Switch>
    );
  }
}
