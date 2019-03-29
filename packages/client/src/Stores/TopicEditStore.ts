import { observable, action } from "mobx";
import { TopicType, ITopic, Option } from "@listed/shared";

export class TopicEditStore {
  @observable topic: Option<ITopic> = null;
  @observable title: string = "";
  @observable description: string = "";
  @observable type: TopicType = TopicType.PUBLIC;
  @observable errors = {
    title: "",
    description: "",
    type: ""
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
    this.title = topic.title;
    this.description = topic.description;
    this.type = topic.type;
  }

  @action.bound
  async update(): Promise<ITopic> {
    if (!this.topic) {
      return Promise.reject();
    }

    let params = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let body = JSON.stringify(params);
        let response = await fetch(`/api/v1/topics/${this.topic.id}`, {
          method: "PUT",
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
    this.topic = null;
    this.title = "";
    this.description = "";
    this.type = TopicType.PUBLIC;
  }
}

export const topicEditStore = new TopicEditStore();
