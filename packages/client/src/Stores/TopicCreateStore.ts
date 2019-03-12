import { observable, action } from "mobx";
import { TopicType } from "@listed/shared";

export class TopicCreateStore {
  @observable title: string = "";
  @observable description: string = "";
  @observable type: TopicType = "public";
  @observable errors = {
    title: "",
    description: "",
    type: ""
  };

  @action.bound
  async create() {
    let params = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let response = await fetch("/api/v1/topics", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
        });
        this.reset();
      }
    } catch (e) {}
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
    this.type = "public";
  }
}

export const topicCreateStore = new TopicCreateStore();
