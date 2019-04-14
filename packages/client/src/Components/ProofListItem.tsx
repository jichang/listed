import React from "react";
import { IProof, ITopic, IConclusion } from "@listed/shared";
import { Proof } from "./Proof";
import { Link } from "react-router-dom";
import "./ProofListItem.css";

export interface IProofListItemProps {
  index: number;
  item: IProof;
  topic: ITopic;
  conclusion: IConclusion;
}

export class ProofListItem extends React.Component<IProofListItemProps> {
  render() {
    const { topic, conclusion, item, index } = this.props;
    return (
      <div className="list__item list__item--proof">
        <Proof proof={item} index={index} />
        {conclusion.isOwner ? (
          <footer className="operations">
            <Link
              to={`/topics/${topic.id}/conclusions/${conclusion.id}/proofs/${
                item.id
              }/edit`}
            >
              Edit
            </Link>
          </footer>
        ) : null}
      </div>
    );
  }
}
