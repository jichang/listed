import React, { Component, FormEvent } from "react";
import { observer } from "mobx-react";
import "./HomePage.css";
import { List } from "./Components/List";
import { TopicListItem } from "./Components/TopicListItem";
import { TopicCollectionStore } from "./Stores/TopicCollectionStore";
import { Pagination } from "./Components/Pagination";
import { TabBar } from "./Components/TabBar";
import { ITabItem } from "./Components/TabItem";
import { observable, action } from "mobx";

@observer
export class HomePage extends Component {
  @observable tabItems: ITabItem[] = [
    {
      key: "default",
      title: "All",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "active"
    },
    {
      key: "subscribe",
      title: "Subscribed",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "inactive"
    }
  ];
  @observable topicCollectionStore = new TopicCollectionStore();
  @observable subscribeCollectionStore = new TopicCollectionStore({
    category: "subscribe"
  });

  getActiveCollectionStore() {
    let activeTabItem = this.tabItems.find(
      tabItem => tabItem.state === "active"
    );
    if (!activeTabItem) {
      return;
    }

    switch (activeTabItem.key) {
      case "default":
        return this.topicCollectionStore;
      case "subscribe":
        return this.subscribeCollectionStore;
    }
  }

  componentDidMount() {
    const { topicCollectionStore, subscribeCollectionStore } = this;

    topicCollectionStore.query();
    subscribeCollectionStore.query();
  }

  search(evt: FormEvent) {
    evt.preventDefault();

    const topicCollectionStore = this.getActiveCollectionStore();
    if (!topicCollectionStore) {
      return;
    }

    topicCollectionStore.query();
  }

  @action.bound
  swithTab(tabItem: ITabItem) {
    this.tabItems.forEach(_tabItem => {
      _tabItem.state = tabItem.key === _tabItem.key ? "active" : "inactive";
    });
  }

  render() {
    const topicCollectionStore = this.getActiveCollectionStore();
    if (!topicCollectionStore) {
      return;
    }

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
        <TabBar items={this.tabItems} onClick={this.swithTab} />
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
