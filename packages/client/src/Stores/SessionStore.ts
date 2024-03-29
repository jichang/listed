import { ISession, IUser, Option } from "@listed/shared";
import { action, observable } from "mobx";

export type VerifyState = "idle" | "sync" | "succeed" | "failed";

export class SessionStore {
  @observable state: VerifyState = "idle";
  @observable session: ISession = {
    user: null
  };

  @action.bound
  async sync() {
    this.state = "sync";

    try {
      let token = window.localStorage.getItem("auth.token");
      if (token) {
        let body = JSON.stringify({
          token
        });
        let response = await fetch("/api/v1/session", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body
        }).then(response => response.json());

        this.update(response.user);
      } else {
        this.update(null);
      }
    } catch (e) {
      this.update(null);
    }
  }

  @action.bound
  update(user: Option<IUser>) {
    this.state = user ? "succeed" : "failed";
    this.session.user = user;
  }

  @action.bound
  clear() {
    window.localStorage.removeItem("auth.token");
    this.update(null);
  }
}

export const sessionStore = new SessionStore();
