import { Message, TextChannel } from "discord.js";
import { config } from "../config.js";
import { client } from "../index.js";

const fs = require("fs")

let bannedList = (() => {
  if (!fs.existsSync('banned_words.txt')) {
    fs.writeFileSync('banned_words.txt', '');
  }
  let words = fs.readFileSync('banned_words.txt').toString('UTF8').split("\n").filter((word: string) => word != "");
  return words
})();

export function addWord(word: string) {
  if (bannedList.includes(word))
    return false;
  bannedList.push(word);
  return true;
}

export function removeWord(word: string) {
  if (!bannedList.includes(word))
    return false;
  let index = bannedList.indexOf(word);
  bannedList = bannedList.filter((e: string, i: number) => i !== index)
  return true;
}
export async function execute(message: Message) {
  let messageText = message.content.toLowerCase();
  let saidBannedWord = false;
  for (let i = 0; i < bannedList.length; i++) {
    saidBannedWord = messageText.includes(bannedList[i])
    if (saidBannedWord) {
      await message.reply({ content: `${message.author}'s message was deleted for containing a blacklisted word` });
      const channel = client.channels.cache.get(config.MOD_LOG_CHANNEL_ID!) as TextChannel;
      if(channel) {
        channel.send({ content: `${message.author}'s message was deleted for containing a blacklisted word\nMessage for context: "${message.content}"`})
      }
      await message.delete()
      break;
    }
  }
}
export function cleanup() {
  let bannedWordText = "";
  for (let i = 0; i < bannedList.length; i++) {
    bannedWordText = bannedWordText.concat(bannedList[i], "\n")
  }
  fs.writeFileSync('banned_words.txt', bannedWordText);
  console.log("Banned words saved!")
}