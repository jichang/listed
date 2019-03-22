import React from "react";
import { IProof } from "@listed/shared";
import ReactMarkdown from "react-markdown";
import "./Proof.css";

export interface IProofProps {
  index: number;
  proof: IProof;
}

export class Proof extends React.Component<IProofProps> {
  render() {
    const { index, proof } = this.props;
    return (
      <div className="proof">
        <ReactMarkdown source={proof.content} />
      </div>
    );
  }
}
