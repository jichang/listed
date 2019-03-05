import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ConclusionCreatePage.css";
import { conclusionCreateStore } from "./Stores/ConclusionCreateStore";
import { RouteComponentProps, RouteProps } from "react-router";

export interface RouterParams {
  id: string;
}

@observer
export class ConclusionCreatePage extends Component<
  RouteComponentProps<RouterParams>
> {
  componentDidMount() {
    const { params } = this.props.match;
    conclusionCreateStore.topicId = params.id;
  }

  render() {
    return (
      <div className="page page--conclusion-create">
        <form className="form" onSubmit={conclusionCreateStore.create}>
          <div className="form__field">
            <label className="form__field__label">结论</label>
            <input
              className="form__control"
              onChange={conclusionCreateStore.updateTitle}
              value={conclusionCreateStore.title}
            />
          </div>
          <div>
            <label className="form__field__label">
              论据<span onClick={conclusionCreateStore.createProof}>+</span>
            </label>
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
              创建新结论
            </button>
          </div>
        </form>
      </div>
    );
  }
}