import { Client, Message } from "discord.js";

import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import * as banWordFilter from "./filters/ban-word-filter";
import { config } from "./config";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
});

client.once("ready", async () => {
    console.log("Discord bot is ready! 🤖");
});
client.on('messageCreate', async (message : Message) => {
  // This may have to get modified in case there is any way for users to force a bot to print something
  // If not a bot, pass message to filters
  if(message.author.bot)
    return;
  banWordFilter.execute(message);
});
client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
      commands[commandName as keyof typeof commands].execute(interaction);
    }
});

process.on('SIGINT', function() {
  banWordFilter.cleanup();
  process.exit()
});

client.login(config.DISCORD_TOKEN);