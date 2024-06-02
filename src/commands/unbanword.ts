import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { removeWord } from "../filters/ban-word-filter";

const fs = require("fs")

export const data = new SlashCommandBuilder()
  .setName("unbanword")
  .setDescription("Allows the user to unban words").addStringOption(option =>
	option.setName('word')
		.setDescription('Word to unban')).setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction: CommandInteraction) {
    let word = interaction.options.get("word");
    let response = "Please provide a word to unban."
    if(word != null){
      let unbannedSuccessfully = removeWord(String(word.value));
      if(unbannedSuccessfully){
        response = "Word was unbanned successfully!";
      }else{
        response = "Word was not present.";
      }
    }
    return interaction.reply({content: response})
}