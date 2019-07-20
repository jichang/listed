import React from "react";
import { IProof } from "@listed/shared";
import ReactMarkdown from "react-markdown";
import "./Proof.css";
import { Badge } from "./Badge";
import { FormattedMessage } from "react-intl";

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
    const { proof, index } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="proof">
        <p className="flex__item">
          {proof.title ? (
            proof.title
          ) : (
            <FormattedMessage
              id="proof-title"
              defaultMessage="论据 {index}"
              description="title of proof"
              values={{ index: index + 1 }}
            />
          )}
          <span className="button" onClick={this.toggleState}>
            <FormattedMessage
              id="see-details"
              defaultMessage="查看详情"
              description="see details"
            />
          </span>
        </p>
        {isOpen ? <ReactMarkdown source={proof.content} /> : null}
      </div>
    );
  }
}
