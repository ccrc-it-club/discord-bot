const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announces a message in a specified channel")
    .addStringOption((option) => option.setName("content").setDescription("The content of the announcement").setRequired(true))
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to announce the message in").setRequired(true)),

  async execute(interaction) {
    const content = interaction.options.getString("content");
    const channel = interaction.options.getChannel("channel");

    try {
      await channel.send(content.replace(/\\n/g, "\n"));
      await interaction.reply(`Announcement sent to ${channel}`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`Failed to send announcement to ${channel}`);
    }
  },
};

//

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announce a message with an optional image.")
    .addStringOption((option) => option.setName("title").setDescription("The title of the announcement.").setRequired(true))
    .addStringOption((option) => option.setName("description").setDescription("The description of the announcement.").setRequired(true))
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to send the announcement to.").setRequired(true))
    .addStringOption((option) => option.setName("image-url").setDescription("An optional URL for an image to be included in the announcement.").setRequired(false)),

  async execute(interaction) {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description").replace(/\\n/g, "\n");
    const imageUrl = interaction.options.getString("image-url") || "";
    const channel = interaction.options.getChannel("channel");

    try {
      await channel.send({
        embeds: [
          {
            title: title,
            description: description,
            color: 0xff0000,
            timestamp: new Date(),
            image: {
              url: imageUrl,
            },
          },
        ],
      });
      await interaction.reply(`Announcement sent to ${channel}`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`Failed to send announcement to ${channel}`);
    }
  },
};
