import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
const fs = require("fs")

const ruleList = (() => {
	let lines = fs.readFileSync('rules.txt').toString('UTF8').split("\n");
	let rules = [];
	let currLineIdx = 0;
	let currRule = "";
	while (currLineIdx < lines.length-1){
		currRule = currRule.concat(lines[currLineIdx], "\n")
		if(!isNaN(Number(lines[currLineIdx + 1][0]))){
			rules.push(currRule)
			currRule = ""
		}
		currLineIdx++;
	}
	// Add last rule in
	rules.push(currRule.concat(lines[currLineIdx]))
	return rules
  })();
export const data = new SlashCommandBuilder()
  .setName("rules")
  .setDescription("Prints rules").addStringOption(option =>
	option.setName('rulenumber')
		.setDescription('rule number. Leave blank for all rules.'))

export async function execute(interaction: CommandInteraction) {
	let ruleno = interaction.options.get("rulenumber");
	// Base embed for rules
	let ruleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('FINN SERVER RULES').setImage('https://evangoemer.com/images/finnbot/RulesPNG.webp')
	.setFooter({ text: 'Rules created Nov 10 2022' });
	// If no rule is given, print them all
	if (ruleno == null) {
		for(let i = 0;i<ruleList.length;i++){
			ruleEmbed = ruleEmbed.addFields(
				{ name: 'RULE: '+String(i + 1), value: ruleList[i] },
			)
		}
	}else{
		// Otherwise they provided a rule, so add the fields if the value is appropriate
		let possibleNum = Number(ruleno.value)
		if (!isNaN(possibleNum) && possibleNum > 0 && possibleNum <= ruleList.length){
			ruleEmbed = ruleEmbed.addFields(
				{ name: 'RULE: '+String(possibleNum), value: ruleList[possibleNum - 1] },
				{ name: '\u200B', value: '\u200B' },
			)
		}else{
			ruleEmbed = ruleEmbed.addFields(
				{ name: 'INVALID RULE NUMBER', value: "Please select a number within the range 1-"+ruleList.length },
				{ name: '\u200B', value: '\u200B' },
			)
		}
	}
	return interaction.reply({ embeds: [ruleEmbed]})
}