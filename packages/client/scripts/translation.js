const fs = require("fs.promises");
const globby = require("globby");

(async () => {
  const results = [];
  const paths = await globby(["./messages/**/*.json"]);
  for (const path of paths) {
    const content = await fs.readFile(path, { encoding: "utf8" });
    const messages = JSON.parse(content);
    for (const message of messages) {
      const sameIdMessage = results.find(
        _message => message.id === _message.id
      );
      if (!sameIdMessage) {
        results.push(message);
      } else if (sameIdMessage.defaultMessage !== message.defaultMessage) {
        throw new Error(
          "found message with same id (",
          sameIdMessage.id,
          ") but with different defaultMessage"
        );
      }
    }
  }

  const translations = await globby("./src/translations/*.json");
  for (const translationFile of translations) {
    const updated = [];
    const content = await fs.readFile(translationFile, { encoding: "utf8" });
    const messages = JSON.parse(content || "[]");
    for (const message of results) {
      const currentTranslation = messages.find(
        _message => message.id === _message.id
      );
      if (
        currentTranslation.originalDefaultMessage !== message.defaultMessage
      ) {
        message.originalDefaultMessage = message.defaultMessage;
        updated.push(message);
      } else {
        updated.push(currentTranslation);
      }
    }

    await fs.writeFile(
      translationFile,
      JSON.stringify(
        updated.sort((itemA, itemB) => {
          if (itemA.id === itemB.id) {
            return 0;
          } else if (itemA.id > itemB.id) {
            return 1;
          } else {
            return -1;
          }
        }),
        null,
        2
      ),
      {
        encoding: "utf8"
      }
    );
  }
})();
