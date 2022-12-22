import dotenv from 'dotenv';
dotenv.config();
import {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Routes,
} from 'discord.js';

import { searchVNEvent, getVisualNovelDetailEvent } from './src/event/index.js';
import { refreshSlashCommand } from './src/function/refreshSlashCommand.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

//Intialize slash command
await refreshSlashCommand();

client.login(process.env.TOKEN);
client.on('ready', async (message) => {
  console.log(`Loggin as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    switch (interaction.commandName) {
      case 'search_vn':
        searchVNEvent(interaction);
        break;
      default:
        break;
    }
  } else if (interaction.isButton()) {
    if (interaction.customId.includes('VisualNovelSearch')) {
      getVisualNovelDetailEvent(interaction);
    }
  }
});
