import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
const app = express();
import { searchVNEvent, getVisualNovelDetailEvent, getVisualNovelScreenshots, getVisualNovelTags, getVisualNovelReleases, searchUserEvent, searchUserList, } from './src/event/index.js';
import { refreshSlashCommand } from './src/function/refreshSlashCommand.js';
const PORT = 3000 || process.env.PORT;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});
app.use('/', (req, res) => {
    res.send('Bot is listening');
});
const start = async () => {
    try {
        await refreshSlashCommand();
        app.listen(PORT, () => {
            console.log('Bot is working');
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
client.login(process.env.TOKEN);
client.on('ready', async (message) => {
    console.log(`Loggin as ${client.user.tag}`);
});
client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case 'vn_search':
                searchVNEvent(interaction);
                break;
            case 'vn_user_search':
                searchUserEvent(interaction);
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
        else if (interaction.customId.includes('Releases')) {
            getVisualNovelReleases(interaction);
        }
        else if (interaction.customId.includes('UserList_')) {
            searchUserList(interaction);
        }
    }
});
