import { observable } from "mobx";
import { ICollection, ITopic } from "@proveit/shared";

export class TopicCollectionStore {
  @observable topics: ICollection<ITopic> = {
    total: 0,
    items: []
  };
}

export const topicCollectionStore = new TopicCollectionStore();
