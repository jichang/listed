import React from "react";
import { Link } from "react-router-dom";
import { ITopic } from "@proveit/shared";
import "./TopicListItem.css";
import { Topic } from "./Topic";

export interface ITopicListItemProps {
  index: number;
  item: ITopic;
}

export class TopicListItem extends React.Component<ITopicListItemProps> {
  render() {
    const { item } = this.props;
    const link = `/topics/${item.id}`;
    return (
      <div className="list__item list__item--topic">
        <Link to={link}>
          <Topic topic={item} />
        </Link>
        <span className="timestamp">发布于{item.created_time}</span>
      </div>
    );
  }
}
