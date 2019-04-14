import React from "react";
import ReactDOM from "react-dom";
import { TopicCreatePage } from "./TopicCreatePage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopicCreatePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
