import { queryVisualNovelByName } from '../api/visualnovel/visualnovel.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { getVisualNovelDetailEvent } from './getVisualNovelDetailEvent.js';
export const searchVNEvent = async (interaction) => {
    const visualNovelName = interaction.options.get('name').value;
    const resultList = await queryVisualNovelByName(visualNovelName);
    const choiceButtons = new ActionRowBuilder();
    if (resultList.length > 1) {
        const message = resultList.reduce((accumulator, currentValue, currentIndex) => {
            choiceButtons.addComponents(new ButtonBuilder()
                .setCustomId(`VisualNovelSearch_${currentValue.id}`)
                .setLabel((currentIndex + 1).toString())
                .setStyle(ButtonStyle.Primary));
            return accumulator + `\n${currentIndex + 1}. ${currentValue.title}`;
        }, 'Do you mean?');
        await interaction.reply({
            content: message,
            components: [choiceButtons],
        });
    }
    else {
        interaction.customId = `VisualNovelSearch_${resultList[0].id}`;
        getVisualNovelDetailEvent(interaction);
    }
};
