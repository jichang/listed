import React from "react";
import { ITopic, TopicType } from "@listed/shared";
import "./Topic.css";

export interface ITopicProps {
  topic: ITopic;
}

export class Topic extends React.Component<ITopicProps> {
  render() {
    const { topic } = this.props;
    return (
      <div className="topic">
        <h4 className="topic__title">{topic.title}</h4>
      </div>
    );
  }
}
