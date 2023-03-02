const { InteractionType } = require("discord-api-types/v10");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!commands) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({ content: "Error 500: Something went wrong", ephemeral: true });
      }
    } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
