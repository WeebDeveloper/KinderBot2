//Registers slash commands
//! To register new commands, terminal > node src/register-commands.js

require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "embed",
    description: "Sends an embed link.",
  },

  {
    name: "add",
    description: "adds two numbers",
    options: [
      {
        name: "first-number",
        description: "the first number.",
        type: ApplicationCommandOptionType.Number, //sets required type
        // choices: [     //how to add default choices
        //   {
        //     name: "one",
        //     value: 1,
        //   },
        //   {
        //     name: "two",
        //     value: 2,
        //   },
        //   {
        //     name: "three",
        //     value: 3,
        //   },
        // ],
        required: true,
      },
      {
        name: "second-number",
        description: "the second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },

  {
    name: "hey",
    description: "Replies (probably)",
  },

  {
    name: "ping",
    description: "pong",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
