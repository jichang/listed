import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TopicPage.css";
import { Topic } from "./Components/Topic";
import { topicStore } from "./Stores/TopicStore";
import { RouteComponentProps, Link, NavLink } from "react-router-dom";
import { ConclusionListItem } from "./Components/ConclusionListItem";
import { List } from "./Components/List";
import AdSense from "./Components/AdSense";

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

    return (
      <div className="page page--topic">
        <div className="topic__info">
          <Topic topic={topicStore.topic} />
          <p className="topic__description">{topicStore.topic.description}</p>
          <span className="timestamp">
            发布于{topicStore.topic.created_time}
          </span>
        </div>

        <AdSense />

        <div className="topic__conclusions">
          <p className="header__title">论点</p>
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