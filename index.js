require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers],
});
client.commands = new Collection();
client.color = 0xeb4034;
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) require(`./src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);
