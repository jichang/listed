import { observable, action } from "mobx";
import { TopicType, ITopic, Option, IProof } from "@listed/shared";

export class ProofEditStore {
  @observable proof: Option<IProof> = null;
  @observable title: string = "";
  @observable content: string = "";

  @action.bound
  async select(topicId: string, conclusionId: string, proofId: string) {
    try {
      let token = window.localStorage.getItem("auth.token");
      let response = await fetch(
        `/api/v1/topics/${topicId}/conclusions/${conclusionId}/proofs/${proofId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ).then(response => response.json());

      this.updateProof(response);
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  updateProof({ proof }: { proof: IProof }) {
    this.proof = proof;
    this.title = proof.title;
    this.content = proof.content;
  }

  @action.bound
  updateTitle(title: string) {
    this.title = title;
  }

  @action.bound
  updateContent(content: string) {
    this.content = content;
  }

  @action.bound
  async update(
    topicId: string,
    conclusionId: string,
    proofId: string
  ): Promise<IProof> {
    if (!this.proof) {
      return Promise.reject();
    }

    let params = {
      title: this.title,
      content: this.content
    };

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let body = JSON.stringify(params);
        let response = await fetch(
          `/api/v1/topics/${topicId}/conclusions/${conclusionId}/proofs/${proofId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body
          }
        ).then(response => response.json());
        this.reset();

        return response as IProof;
      }
      throw new Error("");
    } catch (e) {
      throw e;
    }
  }

  @action.bound
  reset() {
    this.proof = null;
    this.title = "";
    this.content = "";
  }
}

export const proofEditStore = new ProofEditStore();
