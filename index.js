require("dotenv").config();
const http = require("http");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();
client.color = 0xeb4034;
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) require(`./src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/webhook") {
    const mode = req.headers["x-hub-signature"];
    const token = req.headers["x-hub-signature"];

    if (mode && token === process.env.VERIFY_TOKEN) {
      const challenge = req.headers["x-hub-challenge"];
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(challenge);
    } else {
      res.statusCode = 403;
      res.end();
    }
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
