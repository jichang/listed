import { observable } from "mobx";
import {
  ICollection,
  ITopic,
  IConclusion,
  LoadingState,
  Option
} from "@proveit/shared";

export class TopicStore {
  @observable loadingStates: { [index: string]: LoadingState } = {};
  @observable topic: Option<ITopic> = null;
  @observable conclusions: ICollection<IConclusion> = {
    total: 0,
    items: []
  };

  init(topicId: number) {}
}

export const topicStore = new TopicStore();
