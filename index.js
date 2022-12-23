import dotenv from 'dotenv';
import * as http from 'http';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import { searchVNEvent, getVisualNovelDetailEvent, getVisualNovelScreenshots, getVisualNovelTags, } from './src/event/index.js';
import { refreshSlashCommand } from './src/function/refreshSlashCommand.js';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});
http.createServer((req, res) => res.end('Bot is alive!')).listen(3000);
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
    }
    else if (interaction.isButton()) {
        if (interaction.customId.includes('VisualNovelSearchFirstInstance')) {
            getVisualNovelDetailEvent(interaction, 'reply');
        }
        else if (interaction.customId.includes('VisualNovelSearch')) {
            getVisualNovelDetailEvent(interaction);
        }
        else if (interaction.customId.includes('Screenshot')) {
            getVisualNovelScreenshots(interaction);
        }
        else if (interaction.customId.includes('Tags')) {
            getVisualNovelTags(interaction);
        }
    }
});
