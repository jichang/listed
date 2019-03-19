import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import "./App.css";

import {
  AppHeader,
  TopicPageHeader,
  TopicCreatePageHeader,
  ConclusionCreatePageHeader
} from "./Components/AppHeader";
import { HomePage } from "./HomePage";
import { TopicPage } from "./TopicPage";
import { OAuthPage } from "./OAuthPage";
import { sessionStore } from "./Stores/SessionStore";
import { TopicCreatePage } from "./TopicCreatePage";
import { TopicEditPage } from "./TopicEditPage";
import { ConclusionCreatePage } from "./ConclusionCreatePage";

export interface Props extends RouteComponentProps<any> {}

@observer
export class App extends Component<Props> {
  componentDidMount() {
    sessionStore.sync();
  }

  render() {
    if (sessionStore.state === "idle" || sessionStore.state === "sync") {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div>
        <div className="app__header">
          <Switch>
            <Route exact path="/" component={AppHeader} />
            <Route
              exact
              path="/topics/create"
              component={TopicCreatePageHeader}
            />
            <Route exact path="/topics/:id" component={TopicPageHeader} />
            <Route
              exact
              path="/topics/:id/edit"
              component={ConclusionCreatePageHeader}
            />
            <Route
              exact
              path="/topics/:id/conclusions/create"
              component={ConclusionCreatePageHeader}
            />
            <Route exact path="/topics" component={AppHeader} />
          </Switch>
        </div>

        <div className="app__body">
          <Switch>
            <Route exact path="/oauth" component={OAuthPage} />
            <Route exact path="/topics/create" component={TopicCreatePage} />
            <Route exact path="/topics/:id" component={TopicPage} />
            <Route exact path="/topics/:id/edit" component={TopicEditPage} />
            <Route
              exact
              path="/topics/:id/conclusions/create"
              component={ConclusionCreatePage}
            />
            <Route exact path="/topics" component={HomePage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </div>
    );
  }
}
