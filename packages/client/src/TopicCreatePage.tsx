import React, { Component, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import "./TopicCreatePage.css";
import { topicCreateStore } from "./Stores/TopicCreateStore";
import { TopicType } from "@listed/shared";
import { RouteComponentProps } from "react-router";

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
    topicCreateStore.updateType(evt.target.value as TopicType);
  };

  render() {
    return (
      <div className="page page--topic-create">
        <form className="form" onSubmit={evt => this.create(evt)}>
          <div className="form__field">
            <label className="form__field__label">主题</label>
            <input
              className="form__control"
              onChange={this.updateTitle}
              value={topicCreateStore.title}
            />
          </div>
          <div className="form__field">
            <label className="form__field__label">描述</label>
            <textarea
              className="form__control"
              onChange={this.updateDescription}
              value={topicCreateStore.description}
            />
          </div>
          <div className="form__field">
            <label className="form__field__label">类型</label>
            <div className="form__control">
              <label className="form__control--radio">
                <input
                  type="radio"
                  name="topic-name"
                  value="public"
                  checked={topicCreateStore.type === "public"}
                  onChange={this.updateType}
                />
                <span>公开</span>
              </label>
              <label className="form__control--radio">
                <input
                  type="radio"
                  name="topic-name"
                  value="private"
                  checked={topicCreateStore.type === "private"}
                  onChange={this.updateType}
                />
                <span>个人</span>
              </label>
            </div>
          </div>
          <div className="form__field form__field--action">
            <button className="button button--primary button--block">
              创建新主题
            </button>
          </div>
        </form>
      </div>
    );
  }
}
