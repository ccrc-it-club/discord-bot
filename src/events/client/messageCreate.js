const axios = require("axios");
const { handleMention } = require("./mentionHandler");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) handleMention(message);
    if (message.channelId != "1029378762707574864") return;
    return message.react("<:Hi_Badge:1030049540516085912>");
  },
};
