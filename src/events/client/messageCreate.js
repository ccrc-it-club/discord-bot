const axios = require("axios");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) {
      axios
        .get("https://official-joke-api.appspot.com/random_joke")
        .then((response) => {
          const data = response.data;
          message.channel.send(`${data.setup}, ${data.punchline}`);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
    if (message.channelId != "1029378762707574864") return;
    return message.react("<:Hi_Badge:1030049540516085912>");
  },
};
