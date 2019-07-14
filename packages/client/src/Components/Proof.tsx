import React from "react";
import { IProof } from "@listed/shared";
import ReactMarkdown from "react-markdown";
import "./Proof.css";
import { Badge } from "./Badge";

export interface IProofProps {
  index: number;
  proof: IProof;
}

export interface IProofState {
  isOpen: boolean;
}

export class Proof extends React.Component<IProofProps, IProofState> {
  constructor(props: IProofProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleState = () => {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  render() {
    const { proof } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="proof">
        <h4 onClick={this.toggleState}>{proof.title}</h4>
        {isOpen ? <ReactMarkdown source={proof.content} /> : null}
      </div>
    );
  }
}
