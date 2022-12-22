import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { commandList } from '../command/commandList.js';
export const refreshSlashCommand = async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commandList,
        });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
};
