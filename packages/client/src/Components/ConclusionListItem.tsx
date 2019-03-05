import React from "react";
import { IConclusion } from "@proveit/shared";
import { Conclusion } from "./Conclusion";
import { List } from "./List";
import { ProofListItem } from "./ProofListItem";

export interface IConclusionListItemProps {
  index: number;
  item: IConclusion;
}

export class ConclusionListItem extends React.Component<
  IConclusionListItemProps
> {
  render() {
    const { item } = this.props;
    return (
      <div className="list__item list__item--conclusion">
        <Conclusion conclusion={item} />
        <List
          keyProp="id"
          items={item.proofs.items}
          component={ProofListItem}
        />
      </div>
    );
  }
}
