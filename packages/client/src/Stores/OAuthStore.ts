import { OAuthParams } from "@proveit/shared";

export type VerifyState = "idle" | "verify" | "succeed" | "failed";

export class OAuthStore {
  state: VerifyState = "idle";

  async verify(params: OAuthParams) {
    this.state = "verify";

    try {
      let response = await fetch("/api/v1/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }).then(response => response.json());

      this.state = "succeed";
      window.localStorage.setItem("auth.token", response.token);

      window.location.href = "/";
    } catch (e) {
      this.state = "failed";
    }
  }
}

export const oauthStore = new OAuthStore();
