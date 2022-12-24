import { queryVisualNovelByName } from '../api/visualnovel/visualnovel.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { getVisualNovelDetailEvent } from './getVisualNovelDetailEvent.js';
export const searchVNEvent = async (interaction) => {
    const visualNovelName = interaction.options.get('name').value;
    const resultList = await queryVisualNovelByName(visualNovelName);
    const choiceButtons = [];
    let actionRowBuilder = new ActionRowBuilder();
    //const choiceButtons = new ActionRowBuilder();
    if (resultList.length > 1) {
        const message = resultList.reduce((accumulator, currentValue, currentIndex) => {
            if (((currentIndex + 1) % 5 === 0 && currentIndex > 0) ||
                currentIndex + 1 === resultList.length) {
                actionRowBuilder.addComponents(new ButtonBuilder()
                    .setCustomId(`VisualNovelSearchFirstInstance_${currentValue.id}`)
                    .setLabel((currentIndex + 1).toString())
                    .setStyle(ButtonStyle.Secondary));
                choiceButtons.push(actionRowBuilder);
                actionRowBuilder = new ActionRowBuilder();
                return accumulator + `\n${currentIndex + 1}. ${currentValue.title}`;
            }
            actionRowBuilder.addComponents(new ButtonBuilder()
                .setCustomId(`VisualNovelSearchFirstInstance_${currentValue.id}`)
                .setLabel((currentIndex + 1).toString())
                .setStyle(ButtonStyle.Secondary));
            return accumulator + `\n${currentIndex + 1}. ${currentValue.title}`;
        }, 'Do you mean?');
        await interaction.reply({
            content: message,
            components: choiceButtons,
            ephemeral: true,
        });
    }
    else {
        interaction.customId = `VisualNovelSearchFirstInstance_${resultList[0].id}`;
        getVisualNovelDetailEvent(interaction, 'reply');
    }
};
