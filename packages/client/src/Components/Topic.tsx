import React from "react";
import { ITopic, TopicType } from "@listed/shared";
import "./Topic.css";

export interface ITopicProps {
  topic: ITopic;
}

const icons = {
  [TopicType.PUBLIC]: "public",
  [TopicType.PRIVATE]: "private"
};

export class Topic extends React.Component<ITopicProps> {
  render() {
    const { topic } = this.props;
    return (
      <div className="topic">
        <h4 className="topic__title">
          <img
            className="topic__type"
            src={`/images/${icons[topic.type]}.svg`}
          />
          {topic.title}
        </h4>
      </div>
    );
  }
}
