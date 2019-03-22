import React, { Component } from "react";
import { observer } from "mobx-react";
import "./OAuthPage.css";
import * as qs from "querystring";
import { oauthStore } from "./Stores/OAuthStore";

interface Props {}

@observer
export class OAuthPage extends Component<Props> {
  async componentDidMount() {
    const search = location.search;
    const params = qs.parse(search.slice(1));

    oauthStore.verify({
      code: params.code as string,
      state: params.state as string
    });
  }

  render() {
    return <div className="page page--oauth" />;
  }
}
