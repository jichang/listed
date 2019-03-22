import React from "react";
import { TabItem, ITabItem } from "./TabItem";
import "./TabBar.css";

export interface IProps {
  items: ITabItem[];
  onClick: (item: ITabItem) => void;
}

export class TabBar extends React.Component<IProps> {
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
