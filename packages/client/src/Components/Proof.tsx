import React from "react";
import { IProof } from "@listed/shared";

export interface IProofProps {
  index: number;
  proof: IProof;
}

export class Proof extends React.Component<IProofProps> {
  render() {
    const { index, proof } = this.props;
    return (
      <div>
        <p>
          <span>{index + 1}. </span>
          {proof.content}
        </p>
      </div>
    );
  }
}
