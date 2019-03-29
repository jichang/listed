null;
"idle" | "loading" | "succeed" | "failed";
(function (TopicType) {
    TopicType[TopicType["PUBLIC"] = 0] = "PUBLIC";
    TopicType[TopicType["PRIVATE"] = 1] = "PRIVATE";
})(exports.TopicType || (exports.TopicType = {}));
var TopicType = exports.TopicType;
"subscribe" | "create";
