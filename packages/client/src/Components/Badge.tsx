import React from "react";
import "./Badge.css";

export interface Props {
  text: string;
}

export class Badge extends React.Component<Props> {
  render() {
    return <span className="badge">{this.props.text}</span>;
  }
}
