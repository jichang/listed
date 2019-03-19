import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TopicPage.css";
import { Topic } from "./Components/Topic";
import { topicStore } from "./Stores/TopicStore";
import { RouteComponentProps, Link, NavLink } from "react-router-dom";
import { ConclusionListItem } from "./Components/ConclusionListItem";
import { List } from "./Components/List";
import AdSense from "./Components/AdSense";
import { Badge } from "./Components/Badge";

export interface RouterParams {
  id: string;
}

@observer
export class TopicPage extends Component<RouteComponentProps<RouterParams>> {
  componentDidMount() {
    const { params } = this.props.match;
    topicStore.select(params.id);
    topicStore.selectConclusions(params.id, topicStore.paginator);
  }

  render() {
    if (!topicStore.topic) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    let topicAction = null;
    if (!topicStore.topic.isOwner) {
      topicAction = (
        <Badge>
          <NavLink to={`${this.props.match.url}/edit`}>编辑</NavLink>
        </Badge>
      );
    } else {
      if (topicStore.topic.subscription) {
        topicAction = <Badge onClick={topicStore.unsubscribe}>取消订阅</Badge>;
      } else {
        topicAction = <Badge onClick={topicStore.subscribe}>立即订阅</Badge>;
      }
    }

    return (
      <div className="page page--topic">
        <div className="topic__info">
          <Topic topic={topicStore.topic} />
          <p className="topic__description">{topicStore.topic.description}</p>
          <div className="topic__action">
            <span className="timestamp">
              发布于{topicStore.topic.createdTime}
            </span>
            {topicAction}
          </div>
        </div>

        <div className="topic__conclusions">
          <List
            items={topicStore.conclusions.items}
            component={ConclusionListItem}
            keyProp="id"
          />
        </div>
      </div>
    );
  }
}
