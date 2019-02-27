import React from "react";
import { IConclusion } from "@proveit/shared";

export interface IConclusionProps {
  conclusion: IConclusion;
}

export class Conclusion extends React.Component<IConclusionProps> {
  render() {
    const { conclusion } = this.props;
    return (
      <div>
        <h4>{conclusion.title}</h4>
      </div>
    );
  }
}
