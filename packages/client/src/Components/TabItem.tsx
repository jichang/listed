import React from "react";
import classNames from "classnames";
import "./TabItem.css";

export type TabItemState = "disabled" | "active" | "inactive";

export interface ITabItem<Key extends string | number> {
  key: Key;
  title: string;
  icons: { [p in TabItemState]: string };
  state: TabItemState;
}

export interface IProps<Key extends string | number> {
  item: ITabItem<Key>;
  onClick: (item: ITabItem<Key>) => void;
}

export class TabItem<Key extends string | number> extends React.Component<
  IProps<Key>
> {
  render() {
    let { item, onClick } = this.props;

    return (
      <div
        className={classNames("tab__item", `tab__item--${item.state}`)}
        onClick={() => onClick(item)}
      >
        <img src={item.icons[item.state]} />
        <span>{item.title}</span>
      </div>
    );
  }
}
