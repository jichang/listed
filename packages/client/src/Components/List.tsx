import React from "react";

export interface ItemProps<T> {
  index: number;
  item: T;
}

export interface IProps<T> {
  keyProp: keyof T;
  items: T[];
  component: React.ComponentType<ItemProps<T>>;
}

export class List<T> extends React.Component<IProps<T>> {
  render() {
    const { keyProp, items, component } = this.props;

    return (
      <div className="list">
        {items.map((item, index) => {
          let key = item[keyProp].toString();
          return React.createElement(component, {
            key,
            item,
            index
          });
        })}
      </div>
    );
  }
}
