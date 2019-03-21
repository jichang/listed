import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { IntlProvider } from "react-intl";

import messagesEn from "./translations/en.json";
import messagesZh from "./translations/zh.json";

interface Message {
  [index: string]: string;
}

const messages = {
  zh: messagesZh.reduce(
    (obj: Message, message) => {
      obj[message.id] = message.defaultMessage;
      return obj;
    },
    {} as Message
  ),
  en: messagesEn.reduce(
    (obj: Message, message) => {
      obj[message.id] = message.defaultMessage;
      return obj;
    },
    {} as Message
  )
};

import "./localeData";

let RouterApp = withRouter(App);
const language = "en" || (navigator.language.split(/[-_]/)[0] as "en" | "zh");

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
