import React from "react";
import { sessionStore } from "../Stores/SessionStore";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { SiteLogo } from "./SiteLogo";
import { FormattedMessage } from "react-intl";

@observer
export class AppHeader extends React.Component {
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
            {sessionStore.session.user ? (
              <NavLink className="button button--primary" to="/topics/create">
                <FormattedMessage
                  id="publish_topic"
                  defaultMessage="发布新主题"
                  description="title of publish topic button"
                />
              </NavLink>
            ) : (
              <a href="http://sso.feblr.org/oauth?client_id=103377d7cb59de4d4bedc014d5528a6a86dfc3d0696f6da93db9991d5b7c31dd715071a340f4d01f2b57fd00fb2596774f1e7e976234a9f246cbee0df0a36af0&server_id=81caaf26e210057d23ff00fab346f3ad9bc12522d276bbb5b6dee4381b9e4ef8ce97148bf993576f2902847fc192abd0477b364cd9414d5111229130ee92589c&scope_name=user_id&redirect_uri=http://listed.feblr.org/oauth&response_type=code&state=test">
                <FormattedMessage
                  id="signin"
                  defaultMessage="登录"
                  description="title of sign in button"
                />
              </a>
            )}
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
        </div>
      </div>
    );
  }
}
