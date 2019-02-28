import React, { Component } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";
import { Topic } from "./Components/Topic";
import { topicCollectionStore } from "./Stores/TopicListStore";
import { List } from "./Components/List";
import { Conclusion } from "./Components/Conclusion";
import { ConclusionListItem } from "./Components/ConclusionListItem";

@observer
export class TopicPage extends Component {
  render() {
    let topic = topicCollectionStore.topics.items[0];
    return (
      <div className="page page--topic">
        <Topic topic={topic} />
        <List
          keyProp="id"
          items={topic.conclusions.items}
          component={ConclusionListItem}
        />
      </div>
    );
  }
}
