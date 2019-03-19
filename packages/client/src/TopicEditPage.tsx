import React, { Component, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import "./TopicCreatePage.css";
import { topicEditStore } from "./Stores/TopicEditStore";
import { TopicType } from "@listed/shared";
import { RouteComponentProps } from "react-router";

export interface RouterParams {
  id: string;
}

@observer
export class TopicEditPage extends Component<
  RouteComponentProps<RouterParams>
> {
  componentDidMount() {
    const { params } = this.props.match;
    topicEditStore.select(params.id);
  }

  async update(evt: FormEvent) {
    evt.preventDefault();

    let topic = await topicEditStore.update();
    this.props.history.push(`/topics/${topic.id}`);
  }

  updateTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    topicEditStore.updateTitle(evt.target.value);
  };

  updateDescription = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    topicEditStore.updateDescription(evt.target.value);
  };

  updateType = (evt: ChangeEvent<HTMLInputElement>) => {
    topicEditStore.updateType(evt.target.value as TopicType);
  };

  render() {
    return (
      <div className="page page--topic-create">
        <form className="form" onSubmit={evt => this.update(evt)}>
          <div className="form__field">
            <label className="form__field__label">主题</label>
            <input
              className="form__control"
              onChange={this.updateTitle}
              value={topicEditStore.title}
            />
          </div>
          <div className="form__field">
            <label className="form__field__label">描述</label>
            <textarea
              className="form__control"
              onChange={this.updateDescription}
              value={topicEditStore.description}
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
                  checked={topicEditStore.type === "public"}
                  onChange={this.updateType}
                />
                <span>公开</span>
              </label>
              <label className="form__control--radio">
                <input
                  type="radio"
                  name="topic-name"
                  value="private"
                  checked={topicEditStore.type === "private"}
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
