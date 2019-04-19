import React from "react";
import { sessionStore } from "../Stores/SessionStore";
import { observer } from "mobx-react";
import "./AppHeader.css";

@observer
export class SigninRequired extends React.Component {
  render() {
    if (sessionStore.session.user) {
      return this.props.children;
    } else {
      return null;
    }
  }
}
