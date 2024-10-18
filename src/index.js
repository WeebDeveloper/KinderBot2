// Use nodemon in terminal to run bot
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

//When bot comes online, logs custom message to the console
client.on("ready", (c) => {
  console.log(`${c.user.tag} ready for action!`);
});


//Slash commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("hoi!");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }
});

//When user types 'ping' bot replies 'pong'
client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.login(process.env.TOKEN);
