const { GuildMember } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    const javascriptImage = "https://media.discordapp.net/attachments/1029340978823299103/1030798518002126919/Untitled_design.png";

    const welcomEmbed = new EmbedBuilder()
      .setTitle("WELCOME")
      .setURL("https://dsc.gg/ccrc-it-club/")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`**Welcome to CCRC IT CLUB's discord server, ${member.user.username}!**` + "\n\n**Get started by:**\n:round_pushpin: Getting roles [HERE](https://discord.com/channels/1029298474233110548/1030016282860458054)\n:wave: Introducing yourself [HERE](https://discord.com/channels/1029298474233110548/1029378762707574864)" + "\n\nIf you know a member who isn't already in our discord server,\nInvite them: https://dsc.gg/ccrc-it-club/\n\n[Facebook](https://www.facebook.com/ccrcinfotechclub)\n[Instagram](https://www.instagram.com/ccrc.it.club/)\n[Discord](https://dsc.gg/ccrc-it-club/)\n\n**PS: If you are a BOD member please DM any of our online Admin/Mod to get BOD role**")
      .setColor(0xeb4034)
      .setTimestamp()
      .setFooter({ text: "made with discord.js", iconURL: javascriptImage });

    await client.users
      .fetch(member.user.id, false)
      .then((user) => {
        user.send({ embeds: [welcomEmbed] });
      })
      .catch(console.log("Failed to send"));
  },
};
