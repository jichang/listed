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
import { Placeholder } from "./Components/Placeholder";

type TabKey = "default" | "subscribed" | "created";

@observer
export class HomePage extends Component {
  @observable tabItems: ITabItem<TabKey>[] = [
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
      key: "subscribed",
      title: "Subscribed",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "inactive"
    },
    {
      key: "created",
      title: "My",
      icons: {
        active: "",
        inactive: "",
        disabled: ""
      },
      state: "inactive"
    }
  ];
  @observable topicCollectionStore = new TopicCollectionStore();
  @observable subscribedCollectionStore = new TopicCollectionStore({
    category: "subscribed"
  });
  @observable createdCollectionStore = new TopicCollectionStore({
    category: "created"
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
      case "subscribed":
        return this.subscribedCollectionStore;
      case "created":
        return this.createdCollectionStore;
    }
  }

  componentDidMount() {
    const {
      topicCollectionStore,
      subscribedCollectionStore,
      createdCollectionStore
    } = this;

    topicCollectionStore.query();
    subscribedCollectionStore.query();
    createdCollectionStore.query();
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
  swithTab(tabItem: ITabItem<TabKey>) {
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
              placeholder="Search topics by title"
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
        {topicCollectionStore.collection.total === 0 ? (
          <Placeholder>
            <p>No topics found</p>
          </Placeholder>
        ) : null}
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
