import { Message } from "discord.js";
const fs = require("fs")
let bannedList = (() => {
	let words = fs.readFileSync('banned_words.txt').toString('UTF8').split("\n").filter((word : string) => word != "");
	return words
  })();

export function addWord(word : string){
  if(bannedList.includes(word))
    return false;
  bannedList.push(word);
  return true;
}

export function removeWord(word : string){
  if(!bannedList.includes(word))
    return false;
  let index = bannedList.indexOf(word);
  bannedList = bannedList.filter((e : string, i : number) => i !== index)
  return true;
}
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
export function cleanup() {
  let bannedWordText = "";
  for(let i = 0;i<bannedList.length;i++){
    bannedWordText = bannedWordText.concat(bannedList[i], "\n")
  }
  fs.writeFileSync('banned_words.txt', bannedWordText);
  console.log("Banned words saved!")
}