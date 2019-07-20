import React from "react";
import { IConclusion } from "@listed/shared";

export interface IConclusionProps {
  conclusion: IConclusion;
}

export class Conclusion extends React.Component<IConclusionProps> {
  render() {
    const { conclusion } = this.props;
    return (
      <div className="conclusion">
        <h3 id={conclusion.id} className="conclusion__title">
          {conclusion.title}
        </h3>
      </div>
    );
  }
}
