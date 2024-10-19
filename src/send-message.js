//! To register new commands use terminal > node src/send-message.js

require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRow,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1297259363257421875",
    label: "Red",
  },
  {
    id: "1297259710520754290",
    label: "Green",
  },
  {
    id: "1297259768414736424",
    label: "Blue",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1297258831935705088");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or remove a role",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
