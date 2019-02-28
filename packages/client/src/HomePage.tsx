import React, { Component } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";
import { ITopic } from "@proveit/shared";
import { List } from "./Components/List";
import { TopicListItem } from "./Components/TopicListItem";
import { topicCollectionStore } from "./Stores/TopicListStore";

@observer
export class HomePage extends Component {
  render() {
    return (
      <div className="page page--home">
        <List
          keyProp="id"
          items={topicCollectionStore.topics.items}
          component={TopicListItem}
        />
      </div>
    );
  }
}
