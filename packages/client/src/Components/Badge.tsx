import React from "react";
import "./Badge.css";

export interface Props {
  text: string;
  onClick?: () => void;
}

export class Badge extends React.Component<Props> {
  render() {
    return (
      <span onClick={this.props.onClick} className="badge">
        {this.props.text}
      </span>
    );
  }
}
