import React from "react";
import { TabItem, ITabItem } from "./TabItem";
import "./TabBar.css";

export interface IProps<Key extends string | number> {
  items: ITabItem<Key>[];
  onClick: (item: ITabItem<Key>) => void;
}

export class TabBar<Key extends string | number> extends React.Component<
  IProps<Key>
> {
  render() {
    const { items, onClick } = this.props;
    return (
      <div className="tab__bar">
        {items.map(item => {
          return <TabItem item={item} key={item.key} onClick={onClick} />;
        })}
      </div>
    );
  }
}
