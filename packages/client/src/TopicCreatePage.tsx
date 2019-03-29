import React, { Component, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import "./TopicCreatePage.css";
import { topicCreateStore } from "./Stores/TopicCreateStore";
import { TopicType } from "@listed/shared";
import { RouteComponentProps } from "react-router";
import { FormattedMessage } from "react-intl";

@observer
export class TopicCreatePage extends Component<RouteComponentProps<{}>> {
  async create(evt: FormEvent) {
    evt.preventDefault();

    let topic = await topicCreateStore.create();
    this.props.history.push(`/topics/${topic.id}`);
  }

  updateTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    topicCreateStore.updateTitle(evt.target.value);
  };

  updateDescription = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    topicCreateStore.updateDescription(evt.target.value);
  };

  updateType = (evt: ChangeEvent<HTMLInputElement>) => {
    topicCreateStore.updateType(parseInt(evt.target.value, 10) as TopicType);
  };

  render() {
    return (
      <div className="page page--topic-create">
        <form className="form" onSubmit={evt => this.create(evt)}>
          <div className="form__field">
            <label className="form__field__label">
              <FormattedMessage
                id="topic"
                defaultMessage="主题"
                description="title of topic"
              />
            </label>
            <input
              className="form__control"
              onChange={this.updateTitle}
              value={topicCreateStore.title}
            />
          </div>
          <div className="form__field">
            <label className="form__field__label">
              <FormattedMessage
                id="description"
                defaultMessage="描述"
                description="decsription of topic"
              />
            </label>
            <textarea
              className="form__control"
              onChange={this.updateDescription}
              value={topicCreateStore.description}
            />
          </div>
          <div className="form__field">
            <label className="form__field__label">
              <FormattedMessage
                id="type"
                defaultMessage="类型"
                description="type of topic"
              />
            </label>
            <div className="form__control">
              <label className="form__control--radio">
                <input
                  type="radio"
                  name="topic-name"
                  value="public"
                  checked={topicCreateStore.type === TopicType.PUBLIC}
                  onChange={this.updateType}
                />
                <span>
                  <FormattedMessage
                    id="public"
                    defaultMessage="公开"
                    description="public topic"
                  />
                </span>
              </label>
              <label className="form__control--radio">
                <input
                  type="radio"
                  name="topic-name"
                  value="private"
                  checked={topicCreateStore.type === TopicType.PRIVATE}
                  onChange={this.updateType}
                />
                <span>
                  <FormattedMessage
                    id="private"
                    defaultMessage="个人"
                    description="private topic"
                  />
                </span>
              </label>
            </div>
          </div>
          <div className="form__field form__field--action">
            <button className="button button--primary button--block">
              <FormattedMessage
                id="publish_topic"
                defaultMessage="发布新主题"
                description="title of publish topic button"
              />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
