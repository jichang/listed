import React from "react";
import { sessionStore } from "../Stores/SessionStore";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { FormattedMessage } from "react-intl";

@observer
export class SigninRequired extends React.Component {
  render() {
    const enableSignin = process.env.REACT_APP_ENABLE_SIGNUP === "true";
    const oauthEndpoint = process.env.REACT_APP_OAUTH_ENDPOINT;
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
    const serverId = process.env.REACT_APP_OAUTH_SERVER_ID;
    console.log(process.env);
    if (sessionStore.session.user) {
      return this.props.children;
    } else if (enableSignin) {
      return (
        <a
          href={`${oauthEndpoint}?client_id=${clientId}&server_id=${serverId}&scope_name=user.id&redirect_uri=${
            window.location.origin
          }/oauth&response_type=code&state=test`}
        >
          <FormattedMessage
            id="signin"
            defaultMessage="登录"
            description="title of sign in button"
          />
        </a>
      );
    } else {
      return null;
    }
  }
}
