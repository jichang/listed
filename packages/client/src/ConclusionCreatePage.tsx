import React, { Component, FormEvent } from "react";
import { observer } from "mobx-react";
import "./ConclusionCreatePage.css";
import { conclusionCreateStore } from "./Stores/ConclusionCreateStore";
import { RouteComponentProps } from "react-router";
import { Badge } from "./Components/Badge";
import { FormattedMessage } from "react-intl";

export interface IRouterParams {
  id: string;
}

@observer
export class ConclusionCreatePage extends Component<
  RouteComponentProps<IRouterParams>
> {
  componentDidMount() {
    const { params } = this.props.match;
    conclusionCreateStore.topicId = params.id;
  }

  async create(evt: FormEvent) {
    evt.preventDefault();

    let topic = await conclusionCreateStore.create();
    this.props.history.push(`/topics/${conclusionCreateStore.topicId}`);
  }

  render() {
    return (
      <div className="page page--conclusion-create">
        <form className="form" onSubmit={evt => this.create(evt)}>
          <div className="form__field">
            <label className="form__field__label">
              <FormattedMessage
                id="conclusion"
                defaultMessage="结论"
                description="conclusion"
              />
            </label>
            <input
              className="form__control"
              onChange={conclusionCreateStore.updateTitle}
              value={conclusionCreateStore.title}
            />
          </div>
          <div className="flex__box">
            <label className="form__field__label flex__item">
              <FormattedMessage
                id="proof"
                defaultMessage="论据"
                description="proof"
              />
            </label>
            <Badge onClick={conclusionCreateStore.createProof}>+</Badge>
          </div>
          {conclusionCreateStore.proofs.map((proof, index) => {
            return (
              <div className="form__field" key={index}>
                <textarea
                  onChange={evt =>
                    conclusionCreateStore.updateProof(evt, index)
                  }
                  className="form__control"
                  value={proof.content}
                />
              </div>
            );
          })}
          <div className="form__field form__field--action">
            <button className="button button--primary button--block">
              <FormattedMessage
                id="publish_conclustion"
                defaultMessage="发布新论点"
                description="title of publish conclusion button"
              />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
