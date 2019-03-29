import { observable, action } from "mobx";
import { TopicType, ITopic } from "@listed/shared";

export class TopicCreateStore {
  @observable title: string = "";
  @observable description: string = "";
  @observable type: TopicType = TopicType.PUBLIC;
  @observable errors = {
    title: "",
    description: "",
    type: ""
  };

  @action.bound
  async create(): Promise<ITopic> {
    let params = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let body = JSON.stringify(params);
        let response = await fetch("/api/v1/topics", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body
        }).then(response => response.json());
        this.reset();

        return response as ITopic;
      }
      throw new Error("");
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  updateTitle(title: string) {
    this.title = title;
  }

  @action.bound
  updateDescription(description: string) {
    this.description = description;
  }

  @action.bound
  updateType(type: TopicType) {
    this.type = type;
  }

  @action.bound
  reset() {
    this.title = "";
    this.description = "";
    this.type = TopicType.PUBLIC;
  }
}

export const topicCreateStore = new TopicCreateStore();
