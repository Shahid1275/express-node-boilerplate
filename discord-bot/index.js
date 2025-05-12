import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations, 
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) { 
    const url = message.content.split("create ")[1].trim();
    if (!url) {
      return message.reply("Please provide a URL after create");
    }
    return message.reply(`Generate short url id is ${url}`);
  }
  message.reply("Hello! This is a bot made by Shahid Ameen");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "create") {
    const url = interaction.options.getString("url");
    await interaction.reply(`Generate short url id is ${url}`);
  }
});

client.login(process.env.TOKEN);