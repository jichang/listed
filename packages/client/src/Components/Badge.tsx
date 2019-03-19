import React from "react";
import "./Badge.css";

export interface Props {
  onClick?: () => void;
}

export class Badge extends React.Component<Props> {
  render() {
    return (
      <span onClick={this.props.onClick} className="badge">
        {this.props.children}
      </span>
    );
  }
}
