import { observable, action } from "mobx";
import {
  ICollection,
  ITopic,
  IPaginatorParams,
  ITopicQueryParams
} from "@listed/shared";
import { IPageChangeEvent } from "../Components/Pagination";

export class TopicCollectionStore {
  @observable keyword: string = "";
  @observable paginator: IPaginatorParams = {
    offset: 0,
    limit: 20
  };
  @observable collection: ICollection<ITopic> = {
    total: 0,
    items: []
  };

  @action
  async query(params: ITopicQueryParams) {
    try {
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(
        `/api/v1/topics?limit=${params.limit}&offset=${params.offset}&keyword=${
          params.keyword
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => response.json());

      this.update(response);
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  update(collection: ICollection<ITopic>) {
    this.collection = collection;
  }

  @action.bound
  updatePaginator(evt: IPageChangeEvent) {
    this.paginator.offset = this.paginator.limit * evt.page;

    this.query({
      keyword: this.keyword,
      limit: this.paginator.limit,
      offset: this.paginator.offset
    });
  }

  @action.bound
  updateKeyword(keyword: string) {
    this.keyword = keyword;
  }
}

export const topicCollectionStore = new TopicCollectionStore();
