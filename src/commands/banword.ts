import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { addWord } from "../filters/ban-word-filter";

const fs = require("fs")

export const data = new SlashCommandBuilder()
  .setName("banword")
  .setDescription("Allows the user to ban words").addStringOption(option =>
	option.setName('word')
		.setDescription('Word to ban')).setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction: CommandInteraction) {
    let word = interaction.options.get("word");
    let response = "Please provide a word to ban."
    if(word != null){
      let addedSuccessfully = addWord(String(word.value));
      if(addedSuccessfully){
        response = "Word was banned successfully!";
      }else{
        response = "Word was not added.";
      }
    }
    return interaction.reply({content: response})
}