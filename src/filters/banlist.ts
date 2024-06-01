import { Message } from "discord.js";
const fs = require("fs")
const bannedList = (() => {
	let words = fs.readFileSync('banned_words.txt').toString('UTF8').split("\n");
	return words
  })();
export async function execute(message: Message) {
    let messageText = message.content.toLowerCase();
    let saidBannedWord = false;
    for(let i = 0;i<bannedList.length;i++){
        saidBannedWord = messageText.includes(bannedList[i])
        if(saidBannedWord)
            break;
    }
    console.log(saidBannedWord);
}
