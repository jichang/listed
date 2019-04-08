import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TopicPage.css";
import { Topic } from "./Components/Topic";
import { topicStore } from "./Stores/TopicStore";
import { RouteComponentProps, Link, NavLink } from "react-router-dom";
import { ConclusionListItem } from "./Components/ConclusionListItem";
import { List } from "./Components/List";
import { Badge } from "./Components/Badge";
import { PublishDate } from "./Components/PublishDate";
import { FormattedMessage } from "react-intl";
import { Pagination } from "./Components/Pagination";

export interface IRouterParams {
  id: string;
}

@observer
export class TopicPage extends Component<RouteComponentProps<IRouterParams>> {
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
    if (topicStore.topic.isOwner) {
      topicAction = (
        <Badge>
          <NavLink to={`${this.props.match.url}/edit`}>
            <FormattedMessage
              id="edit"
              defaultMessage="编辑"
              description="title of edit button"
            />
          </NavLink>
        </Badge>
      );
    } else {
      if (topicStore.topic.subscription) {
        topicAction = (
          <Badge onClick={topicStore.unsubscribe}>
            <FormattedMessage
              id="unsubscribe"
              defaultMessage="取消订阅"
              description="title of unsubscribe button"
            />
          </Badge>
        );
      } else {
        topicAction = (
          <Badge onClick={topicStore.subscribe}>
            <FormattedMessage
              id="subscribe"
              defaultMessage="立即订阅"
              description="title of subscribe button"
            />
          </Badge>
        );
      }
    }

    return (
      <div className="page page--topic">
        <div className="topic__info">
          <Topic topic={topicStore.topic} />
          <p className="topic__description">{topicStore.topic.description}</p>
          <div className="topic__action">
            <PublishDate date={topicStore.topic.createdTime} />
            {topicAction}
          </div>
        </div>

        <div className="topic__conclusions">
          <List
            items={topicStore.conclusions.items}
            component={ConclusionListItem}
            keyProp="id"
          />
          {topicStore.conclusions.total > topicStore.paginator.limit ? (
            <Pagination
              total={topicStore.conclusions.total}
              pageSize={topicStore.paginator.limit}
              onChange={topicStore.updatePaginator}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
