import { observable, action } from "mobx";
import {
  ICollection,
  ITopic,
  IPaginatorParams,
  ITopicQueryParams
} from "@listed/shared";
import { IPageChangeEvent } from "../Components/Pagination";

export class TopicCollectionStore {
  defaultParams?: Partial<ITopicQueryParams> = undefined;
  @observable keyword: string = "";
  @observable paginator: IPaginatorParams = {
    offset: 0,
    limit: 20
  };
  @observable collection: ICollection<ITopic> = {
    total: 0,
    items: []
  };

  constructor(defaultParams?: Partial<ITopicQueryParams>) {
    this.defaultParams = defaultParams;
  }

  @action
  async query() {
    try {
      let params: ITopicQueryParams = {
        keyword: this.keyword,
        limit: this.paginator.limit,
        offset: this.paginator.offset,
        ...this.defaultParams
      };
      let searchParams = new URLSearchParams();
      for (let key in params) {
        searchParams.append(key, (params as any)[key]);
      }
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(`/api/v1/topics?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.json());

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

    this.query();
  }

  @action.bound
  updateKeyword(keyword: string) {
    this.keyword = keyword;
  }
}
