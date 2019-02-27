import React, { Component } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";

@observer
export class TopicPage extends Component {
  render() {
    return <div className="page page--topic" />;
  }
}
