import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
const fs = require("fs")

const ruleList = (() => {
	let lines = fs.readFileSync('rules.txt').toString('UTF8').split("\n");
	let rules = [];
	let currLineIdx = 0;
	let currRule = "";
	while (currLineIdx < lines.length-1){
		currRule = currRule.concat(lines[currLineIdx])
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
	.setTitle('FINN SERVER RULES').setImage('https://media.discordapp.net/attachments/1040323190636937226/1161526051189571665/RulesPNG.png?ex=665b512e&is=6659ffae&hm=0e5e318849d078774d13f1af3319c562e0dbc0003cc2f74127396f7c7c309020&=&format=webp&quality=lossless&width=1440&height=288')
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