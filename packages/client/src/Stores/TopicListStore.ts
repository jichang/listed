import { observable, action } from "mobx";
import { ICollection, ITopic, IPaginatorParams } from "@proveit/shared";
import { PageChangeEvent } from "../Components/Pagination";

export class TopicCollectionStore {
  @observable paginator: IPaginatorParams = {
    offset: 0,
    limit: 50
  };
  @observable collection: ICollection<ITopic> = {
    total: 0,
    items: []
  };

  @action
  async query(paginatorParams: IPaginatorParams) {
    try {
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(
        `/api/v1/topics?limit=${paginatorParams.limit}&offset=${
          paginatorParams.offset
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
  updatePaginator(evt: PageChangeEvent) {
    this.paginator.offset = this.paginator.limit * evt.page;

    this.query(this.paginator);
  }
}

export const topicCollectionStore = new TopicCollectionStore();
