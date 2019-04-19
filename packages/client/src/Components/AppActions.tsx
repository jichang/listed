import React from "react";
import { observer } from "mobx-react";
import "./AppActions.css";
import { FormattedMessage } from "react-intl";
import { SigninRequired } from "./SigninRequired";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { GoPencil } from "react-icons/go";

@observer
export class TopicCreateAction extends React.Component {
  render() {
    return (
      <SigninRequired>
        <NavLink
          className="button button--primary button--action"
          to="/topics/create"
        >
          <GoPencil />
        </NavLink>
      </SigninRequired>
    );
  }
}

export interface IRouterParams {
  id: string;
}

@observer
export class ConclusionCreateAction extends React.Component<
  RouteComponentProps<IRouterParams>
> {
  render() {
    return (
      <SigninRequired>
        <NavLink
          className="button button--primary button--action"
          to={`/topics/${this.props.match.params.id}/conclusions/create`}
        >
          <GoPencil />
        </NavLink>
      </SigninRequired>
    );
  }
}
