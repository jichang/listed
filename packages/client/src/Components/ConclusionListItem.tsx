import React from "react";
import { IConclusion } from "@listed/shared";
import { Conclusion } from "./Conclusion";
import { List } from "./List";
import { ProofListItem } from "./ProofListItem";
import { PublishDate } from "./PublishDate";

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
        <PublishDate date={item.createdTime} />

        <List
          keyProp="id"
          items={item.proofs.items}
          component={ProofListItem}
        />
      </div>
    );
  }
}
