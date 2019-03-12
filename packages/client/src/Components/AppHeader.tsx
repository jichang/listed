import React from "react";
import { sessionStore } from "../Stores/SessionStore";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { NavLink, RouteComponentProps } from "react-router-dom";

@observer
export class AppHeader extends React.Component {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <h4 className="flex__item">Listed!</h4>
          <div>
            {sessionStore.session.user ? (
              <NavLink className="button button--primary" to="/topics/create">
                发布新主题
              </NavLink>
            ) : (
              <a href="http://sso.feblr.org/oauth?client_id=8719268879841e29af3b53777eee5fad6d4aa4ec53d7098f57aa5d8fb779dd2113932a8a00a92672b4c7bcf25c413ac1eea807fa0bcb0d5690cc1eaee2c72fc7&server_id=81caaf26e210057d23ff00fab346f3ad9bc12522d276bbb5b6dee4381b9e4ef8ce97148bf993576f2902847fc192abd0477b364cd9414d5111229130ee92589c&scope_name=user_id&redirect_uri=http://listed.feblr.org/oauth&response_type=code&state=test">
                登录
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
              <NavLink to="/">&lt;返回首页</NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export interface TopicParams {
  id: string;
}

@observer
export class ConclusionCreatePageHeader extends React.Component<
  RouteComponentProps<TopicParams>
> {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            <p>
              <NavLink to={`/topics/${this.props.match.params.id}`}>
                &lt;返回
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
  RouteComponentProps<TopicParams>
> {
  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            <p>
              <NavLink to="/">&lt;返回首页</NavLink>
            </p>
          </div>
          <NavLink
            className="button button--primary"
            to={`${this.props.match.url}/conclusions/create`}
          >
            发布新论点
          </NavLink>
        </div>
      </div>
    );
  }
}
