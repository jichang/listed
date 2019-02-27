import React from "react";
import { ITopic } from "@proveit/shared";
import { Topic } from "./Topic";
import { Link } from "react-router-dom";

export interface ITopicListItemProps {
  index: number;
  item: ITopic;
}

export class TopicListItem extends React.Component<ITopicListItemProps> {
  render() {
    const { item } = this.props;
    return (
      <div className="list__item list__item--topic">
        <Topic topic={item} />
        <Link to={`/topic/${item.id}`}>Details</Link>
      </div>
    );
  }
}
