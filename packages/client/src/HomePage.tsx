import React, { Component } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";
import { ITopic } from "@proveit/shared";
import { List } from "./Components/List";
import { TopicListItem } from "./Components/TopicListItem";

@observer
export class HomePage extends Component {
  topics: ITopic[] = [
    {
      id: 0,
      title: "test A",
      created_time: "0",
      conclusions: {
        total: 0,
        items: []
      },
      status: 0
    }
  ];

  render() {
    return (
      <div className="page page--home">
        <List keyProp="id" items={this.topics} component={TopicListItem} />
      </div>
    );
  }
}
