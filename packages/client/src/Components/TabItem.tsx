import React from "react";
import "./TabItem.css";

export type TabItemState = "disabled" | "active" | "inactive";

export interface ITabItem {
  key: string | number;
  title: string;
  icons: { [p in TabItemState]: string };
  state: TabItemState;
}

export interface IProps {
  item: ITabItem;
  onClick: (item: ITabItem) => void;
}

export class TabItem extends React.Component<IProps> {
  render() {
    let { item } = this.props;

    return (
      <div className="tab__item">
        <img src={item.icons[item.state]} />
        <span>{item.title}</span>
      </div>
    );
  }
}
