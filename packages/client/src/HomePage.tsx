import React, { Component, FormEvent } from "react";
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
    topicCollectionStore.query({
      keyword: topicCollectionStore.keyword,
      limit: topicCollectionStore.paginator.limit,
      offset: topicCollectionStore.paginator.offset
    });
  }

  search(evt: FormEvent) {
    evt.preventDefault();

    topicCollectionStore.query({
      keyword: topicCollectionStore.keyword,
      limit: topicCollectionStore.paginator.limit,
      offset: topicCollectionStore.paginator.offset
    });
  }

  render() {
    return (
      <div className="page page--home">
        <form onSubmit={evt => this.search(evt)}>
          <div className="form__field">
            <input
              id="keyword"
              type="text"
              name="keyword"
              value={topicCollectionStore.keyword}
              onChange={evt => {
                topicCollectionStore.updateKeyword(evt.target.value);
              }}
              className="form__control"
            />
          </div>
        </form>
        <List
          keyProp="id"
          items={topicCollectionStore.collection.items}
          component={TopicListItem}
        />
        {topicCollectionStore.collection.total >
        topicCollectionStore.paginator.limit ? (
          <Pagination
            total={topicCollectionStore.collection.total}
            pageSize={topicCollectionStore.paginator.limit}
            onChange={topicCollectionStore.updatePaginator}
          />
        ) : null}
      </div>
    );
  }
}
