import { observable, action } from "mobx";
import {
  ICollection,
  ITopic,
  IConclusion,
  LoadingState,
  Option,
  IPaginatorParams
} from "@listed/shared";

export class TopicStore {
  @observable loadingStates: { [index: string]: LoadingState } = {};
  @observable topic: Option<ITopic> = null;
  @observable conclusions: ICollection<IConclusion> = {
    total: 0,
    items: []
  };
  @observable paginator: IPaginatorParams = {
    offset: 0,
    limit: 50
  };

  @action.bound
  async select(topicId: string) {
    try {
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(`/api/v1/topics/${topicId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.json());

      this.updateTopic(response);
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  updateTopic({ topic }: { topic: ITopic }) {
    this.topic = topic;
  }

  @action.bound
  async selectConclusions(topicId: string, paginator: IPaginatorParams) {
    try {
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(
        `/api/v1/topics/${topicId}/conclusions?limit=${
          paginator.limit
        }&offset=${paginator.offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => response.json());

      this.updateConclusions(response);
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  updateConclusions(conclusions: ICollection<IConclusion>) {
    this.conclusions = conclusions;
  }
}

export const topicStore = new TopicStore();
