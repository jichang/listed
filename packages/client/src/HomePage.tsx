import React, { Component } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";
import { List } from "./Components/List";
import { TopicListItem } from "./Components/TopicListItem";
import { topicCollectionStore } from "./Stores/TopicListStore";
import { Pagination } from "./Components/Pagination";
import AdSense from "./Components/AdSense";

@observer
export class HomePage extends Component {
  componentDidMount() {
    topicCollectionStore.query(topicCollectionStore.paginator);
  }

  render() {
    return (
      <div className="page page--home">
        <List
          keyProp="id"
          items={topicCollectionStore.collection.items}
          component={TopicListItem}
        />
        <Pagination
          total={topicCollectionStore.collection.total}
          pageSize={topicCollectionStore.paginator.limit}
          onChange={topicCollectionStore.updatePaginator}
        />
      </div>
    );
  }
}
