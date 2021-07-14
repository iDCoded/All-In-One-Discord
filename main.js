/***********************************
    DCoded \\ AllInOne DiscordJS Bot
***********************************/

// Prefix : '~'

const Discord = require("discord.js");
const settings = require("./settings.json");
const client = new Discord.Client();
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  // console.log(file);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(settings.prefix) || msg.author.bot) return;

  const args = msg.content.slice(settings.prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd === "arg-info") {
    // msg.channel.send(`Command name: ${cmd}\nArgument: ${args}`);
    client.commands.get("args-info").execute(msg, cmd, args);
  }
  if (cmd === "hey") {
    client.commands.get("hello").execute(msg, args);
  }
  if (cmd === "list") {
    client.commands.get("list").execute(msg, args);
  }
  if (cmd === "clear") {
    client.commands.get("clear").execute(msg, args);
  }
});

client.login(settings.token);
