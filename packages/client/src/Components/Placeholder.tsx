import React from "react";
import "./Placeholder.css";

export interface IProps {}

export class Placeholder extends React.Component<IProps> {
  render() {
    return <div className="placeholder">{this.props.children}</div>;
  }
}
