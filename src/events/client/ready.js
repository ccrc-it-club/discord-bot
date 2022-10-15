const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({ activities: [{ name: `over CCRC IT CLUB`, type: ActivityType.Watching }], status: "dnd" });
    console.log(`🟢: ${client.user.username} is Online! `);
  },
};
