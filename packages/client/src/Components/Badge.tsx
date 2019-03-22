import React from "react";
import "./Badge.css";

export interface IProps {
  onClick?: () => void;
}

export class Badge extends React.Component<IProps> {
  render() {
    return (
      <span onClick={this.props.onClick} className="badge">
        {this.props.children}
      </span>
    );
  }
}
