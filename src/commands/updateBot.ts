import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "../deploy-commands";

export const data = new SlashCommandBuilder()
  .setName("updatebot")
  .setDescription("Updates the bots commands!");

export async function execute(interaction: CommandInteraction) {
  if(interaction.guildId !== null) {
    console.log(interaction.guildId);
    await deployCommands({ guildId: interaction.guildId });
  }

  return interaction.reply({ content: "Done!", ephemeral: true });
}