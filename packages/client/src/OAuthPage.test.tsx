import React from "react";
import ReactDOM from "react-dom";
import { OAuthPage } from "./OAuthPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<OAuthPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
