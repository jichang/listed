import React from "react";
import { Link } from "react-router-dom";
import { ITopic } from "@listed/shared";
import "./TopicListItem.css";
import { Topic } from "./Topic";
import { PublishDate } from "./PublishDate";

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
        <PublishDate date={item.createdTime} />
      </div>
    );
  }
}
