import React from "react";
import { ITopic } from "@listed/shared";
import { Link } from "react-router-dom";
import "./Topic.css";
import { Badge } from "./Badge";

export interface ITopicProps {
  topic: ITopic;
}

export class Topic extends React.Component<ITopicProps> {
  render() {
    const { topic } = this.props;
    return (
      <div className="topic">
        <h4 className="topic__title">
          <img className="topic__type" src={`/images/${topic.type}.svg`} />
          {topic.title}
        </h4>
      </div>
    );
  }
}
