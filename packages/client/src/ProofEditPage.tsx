import React, { Component, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import "./ProofEditPage.css";
import { proofEditStore } from "./Stores/ProofEditStore";
import { RouteComponentProps } from "react-router";
import { FormattedMessage } from "react-intl";

export interface IRouterParams {
  topicId: string;
  conclusionId: string;
  proofId: string;
}

@observer
export class ProofEditPage extends Component<
  RouteComponentProps<IRouterParams>
> {
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

  updateContent = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    proofEditStore.updateContent(evt.target.value);
  };

  render() {
    return (
      <div className="page page--proof-edit">
        <form className="form" onSubmit={evt => this.update(evt)}>
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
      </div>
    );
  }
}
