import { observable, action } from "mobx";
import { ChangeEvent, FormEvent } from "react";
import { IProof } from "@listed/shared";

export class ConclusionCreateStore {
  @observable topicId: string = "";
  @observable title: string = "";
  @observable proofs: { content: string }[] = [];

  @action.bound
  async create() {
    let params = {
      title: this.title,
      proofs: this.proofs
    };

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let response = await fetch(
          `/api/v1/topics/${this.topicId}/conclusions`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
          }
        );

        this.reset();
      }
    } catch (e) {}
  }

  @action.bound
  updateTitle(evt: ChangeEvent<HTMLInputElement>) {
    this.title = evt.target.value;
  }

  @action.bound
  createProof() {
    this.proofs.push({
      content: ""
    });
  }

  @action.bound
  updateProof(evt: ChangeEvent<HTMLTextAreaElement>, index: number) {
    this.proofs[index].content = evt.target.value;
  }

  @action.bound
  reset() {
    this.title = "";
    this.proofs = [];
  }
}

export const conclusionCreateStore = new ConclusionCreateStore();
