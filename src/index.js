// Use nodemon in terminal to run bot
require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

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

//Slash commands listener_____________________________________________________
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  //! -- Currently broken --
  //   if (interaction.isButton()) {
  //     try {
  //       await interaction.deferReply({ ephemeral: true });

  //       const role = interaction.guild.roles.cache.get(interaction.customId);
  //       if (!role) {
  //         interaction.editReply({
  //           content: "I couldn't find that role",
  //         });
  //         return;
  //       }

  //       const hasRole = interaction.member.roles.cache.has(role.id);

  //       if (hasRole) {
  //         await interaction.member.roles.remove(role);
  //         await interaction.editReply(`The role ${role} has been removed.`);
  //         return;
  //       }

  //       await interaction.member.roles.add(role);
  //       await interaction.editReply(`The role ${role} has been added.`);
  //     } catch (error) {
  //       console.log(`Error: ${error}`);
  //     }
  //   }
  //!^^ -- Currently broken --

  if (interaction.commandName === "hey") {
    interaction.reply("hoi!");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("pong");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}.`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is and embed description.")
      .setColor("Random")
      .addFields(
        {
          name: "Field Title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "2nd Field Title",
          value: "Some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});
//End Slash Commands listener_______________________________________________________

//When user types 'ping' bot replies 'pong'
client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.login(process.env.TOKEN);
