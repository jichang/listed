import React from "react";
import { IProof } from "@listed/shared";
import { Proof } from "./Proof";

export interface IProofListItemProps {
  index: number;
  item: IProof;
}

export class ProofListItem extends React.Component<IProofListItemProps> {
  render() {
    const { item, index } = this.props;
    return (
      <div className="list__item list__item--proof">
        <Proof proof={item} index={index} />
      </div>
    );
  }
}
