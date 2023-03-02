const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announcement")
    .addStringOption((option) => option.setName("content").setDescription("The content of the announcement, Make sure it is formatted").setRequired(true))
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to announce the message in").setRequired(true)),

  async execute(interaction) {
    const content = interaction.options.getString("content");
    const channel = interaction.options.getChannel("channel");

    try {
      await channel.send(content.replace(/ {4}/g, "\n"));
      await interaction.reply(`Announcement sent to ${channel}`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`Failed to send announcement to ${channel}`);
    }
  },
};
