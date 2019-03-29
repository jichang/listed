import React from "react";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { SiteLogo } from "./SiteLogo";
import { FormattedMessage } from "react-intl";
import { topicStore } from "../Stores/TopicStore";
import { SigninRequired } from "./SigninRequired";
import { TopicType } from "@listed/shared";

@observer
export class AppHeader extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <h4 className="flex__item">
            <SiteLogo />
            <span className="app__header__title">
              <FormattedMessage
                id="app_title"
                defaultMessage="Listed"
                description="title of application"
              />
            </span>
          </h4>
          <div>
            <SigninRequired>
              <NavLink className="button button--primary" to="/topics/create">
                <FormattedMessage
                  id="publish_topic"
                  defaultMessage="发布新主题"
                  description="title of publish topic button"
                />
              </NavLink>
            </SigninRequired>
          </div>
        </div>
      </div>
    );
  }
}

@observer
export class TopicCreatePageHeader extends React.Component {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            <p>
              <NavLink to="/">
                <FormattedMessage
                  id="back_to_home"
                  defaultMessage="返回首页"
                  description="title fo back to home button"
                />
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export interface ITopicParams {
  id: string;
}

@observer
export class ConclusionCreatePageHeader extends React.Component<
  RouteComponentProps<ITopicParams>
> {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            <p>
              <NavLink to={`/topics/${this.props.match.params.id}`}>
                <FormattedMessage
                  id="back_to_topic"
                  defaultMessage="返回主题"
                  description="title fo back to topic button"
                />
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

@observer
export class TopicPageHeader extends React.Component<
  RouteComponentProps<ITopicParams>
> {
  render() {
    let canPublishConclusion =
      topicStore.topic &&
      (topicStore.topic.isOwner || topicStore.topic.type === TopicType.PUBLIC);

    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            <p>
              <NavLink to="/">
                <FormattedMessage
                  id="back_to_home"
                  defaultMessage="返回首页"
                  description="title fo back to home button"
                />
              </NavLink>
            </p>
          </div>
          {canPublishConclusion ? (
            <NavLink
              className="button button--primary"
              to={`${this.props.match.url}/conclusions/create`}
            >
              <FormattedMessage
                id="publish_conclustion"
                defaultMessage="发布新论点"
                description="title of publish conclusion button"
              />
            </NavLink>
          ) : null}
        </div>
      </div>
    );
  }
}
