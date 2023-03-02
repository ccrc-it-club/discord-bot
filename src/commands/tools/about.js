const { EmbedBuilder } = require("discord.js");

const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("about").setDescription("Shows information about the Club"),
  async execute(interaction, client) {
    const javascriptImage = "https://media.discordapp.net/attachments/1029340978823299103/1030798518002126919/Untitled_design.png";

    const aboutEmbed = new EmbedBuilder()
      .setTitle("CCRC IT CLUB")
      .setURL("https://dsc.gg/ccrc-it-club/")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("CCRC IT Club is CCRC students' union since 2068 BS contributing" + "\n\n**Get started by:**\n:round_pushpin: Getting roles at <#1029376481002004591>\n:wave: Introducing yourself at <#1029378762707574864>" + "\n\n[Facebook](https://www.facebook.com/ccrcinfotechclub)\n[Instagram](https://www.instagram.com/ccrc.it.club/)\n[Discord](https://dsc.gg/ccrc-it-club/)")
      .setColor(0xeb4034)
      .setTimestamp()
      .setFooter({ text: "made with discord.js", iconURL: javascriptImage });
    await interaction.reply({
      embeds: [aboutEmbed],
    });
  },
};
