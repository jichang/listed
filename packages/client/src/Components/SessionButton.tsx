import React from "react";
import "./Badge.css";
import { sessionStore } from "../Stores/SessionStore";
import { FormattedMessage } from "react-intl";

export interface IProps {
  onClick?: () => void;
}

export class SessionButton extends React.Component<IProps> {
  signout() {
    sessionStore.clear();
  }

  render() {
    const oauthEndpoint = process.env.REACT_APP_OAUTH_ENDPOINT;
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
    const serverId = process.env.REACT_APP_OAUTH_SERVER_ID;

    if (sessionStore.session.user) {
      return (
        <button
          onClick={() => this.signout()}
          className="button button--primary"
        >
          <FormattedMessage
            id="signout"
            defaultMessage="登出"
            description="title of sign out button"
          />
        </button>
      );
    } else {
      return (
        <a
          className="button button--primary"
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
    }
  }
}
