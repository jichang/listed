import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import "./App.css";

import { AppHeader } from "./Components/AppHeader";
import { HomePage } from "./HomePage";
import { TopicPage } from "./TopicPage";
import { OAuthPage } from "./OAuthPage";
import { sessionStore } from "./Stores/SessionStore";
import { TopicCreatePage } from "./TopicCreatePage";
import { TopicEditPage } from "./TopicEditPage";
import { ProofEditPage } from "./ProofEditPage";
import { ConclusionCreatePage } from "./ConclusionCreatePage";
import {
  TopicCreateAction,
  ConclusionCreateAction
} from "./Components/AppActions";

export interface IProps extends RouteComponentProps<any> {}

@observer
export class App extends Component<IProps> {
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
        <Switch>
          <Route path="/" component={AppHeader} />
        </Switch>

        <div className="app__body">
          <Switch>
            <Route exact path="/oauth" component={OAuthPage} />
            <Route exact path="/topics/create" component={TopicCreatePage} />
            <Route exact path="/topics/:id(\d+)" component={TopicPage} />
            <Route
              exact
              path="/topics/:id(\d+)/edit"
              component={TopicEditPage}
            />
            <Route
              exact
              path="/topics/:id(\d+)/conclusions/create"
              component={ConclusionCreatePage}
            />
            <Route
              exact
              path="/topics/:topicId(\d+)/conclusions/:conclusionId(\d+)/proofs/:proofId(\d+)/edit"
              component={ProofEditPage}
            />
            <Route exact path="/topics" component={HomePage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>

        <div className="app__actions">
          <Switch>
            <Route
              exact
              path="/topics/:id(\d+)"
              component={ConclusionCreateAction}
            />
            <Route exact path="/topics" component={TopicCreateAction} />
            <Route exact path="/" component={TopicCreateAction} />
          </Switch>
        </div>
      </div>
    );
  }
}
