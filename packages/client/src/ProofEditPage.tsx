import React, { Component, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import "./ProofEditPage.css";
import { proofEditStore } from "./Stores/ProofEditStore";
import { RouteComponentProps } from "react-router";
import { FormattedMessage } from "react-intl";
import { TabBar } from "./Components/TabBar";
import { ITabItem } from "./Components/TabItem";
import { action, observable } from "mobx";
import ReactMarkdown from "react-markdown";

type TabKey = "edit" | "preview";

export interface IRouterParams {
  topicId: string;
  conclusionId: string;
  proofId: string;
}

@observer
export class ProofEditPage extends Component<
  RouteComponentProps<IRouterParams>
> {
  @observable tabItems: ITabItem<TabKey>[] = [
    {
      key: "edit",
      title: "Edit",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "active"
    },
    {
      key: "preview",
      title: "Preview",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "inactive"
    }
  ];

  componentDidMount() {
    const { params } = this.props.match;
    proofEditStore.select(params.topicId, params.conclusionId, params.proofId);
  }

  async update(evt: FormEvent) {
    evt.preventDefault();

    const { params } = this.props.match;
    let proof = await proofEditStore.update(
      params.topicId,
      params.conclusionId,
      params.proofId
    );
    this.props.history.push(`/topics/${params.topicId}`);
  }

  updateTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    proofEditStore.updateTitle(evt.target.value);
  };

  updateContent = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    proofEditStore.updateContent(evt.target.value);
  };

  @action.bound
  swithTab(tabItem: ITabItem<TabKey>) {
    this.tabItems.forEach(_tabItem => {
      _tabItem.state = tabItem.key === _tabItem.key ? "active" : "inactive";
    });
  }

  render() {
    return (
      <div className="page page--proof-edit">
        <TabBar items={this.tabItems} onClick={this.swithTab} />

        {this.tabItems[0].state === "active" ? (
          <form className="form" onSubmit={evt => this.update(evt)}>
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
                value={proofEditStore.title}
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
                onChange={this.updateContent}
                value={proofEditStore.content}
              />
            </div>
            <div className="form__field form__field--action">
              <button className="button button--primary button--block">
                <FormattedMessage
                  id="edit_proof"
                  defaultMessage="修改论据"
                  description="title of edit proof button"
                />
              </button>
            </div>
          </form>
        ) : null}

        {this.tabItems[1].state === "active" ? (
          <div className="proof">
            <h4>{proofEditStore.title}</h4>
            <ReactMarkdown source={proofEditStore.content} />
          </div>
        ) : null}
      </div>
    );
  }
}
