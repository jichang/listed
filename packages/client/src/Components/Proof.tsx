import React from "react";
import { IProof } from "@proveit/shared";

export interface IProofProps {
  proof: IProof;
}

export class Proof extends React.Component<IProofProps> {
  render() {
    const { proof } = this.props;
    return (
      <div>
        <h4>{proof.content}</h4>
      </div>
    );
  }
}
