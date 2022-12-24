import { queryVisualNovelById } from '../api/visualnovel/visualnovel.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, } from 'discord.js';
export const getVisualNovelScreenshots = async (interaction) => {
    const visualNovelId = interaction.customId.split('_')[1];
    const visualNovel = await queryVisualNovelById(visualNovelId);
    const visualNovelDetail = visualNovel[0];
    const choiceButtons = new ActionRowBuilder();
    const SFW_Screenshots = visualNovelDetail.screenshots
        .filter((screenshot) => {
        return screenshot.sexual === 0;
    })
        .slice(0, 10);
    choiceButtons.addComponents([
        new ButtonBuilder()
            .setCustomId(`VisualNovelSearch_${visualNovelId}`)
            .setLabel('Details')
            .setStyle(ButtonStyle.Primary),
    ]);
    choiceButtons.addComponents([
        new ButtonBuilder()
            .setCustomId(`Screenshot_${visualNovelId}`)
            .setLabel('Screenshot')
            .setStyle(ButtonStyle.Primary),
    ]);
    choiceButtons.addComponents([
        new ButtonBuilder()
            .setCustomId(`Tags_${visualNovelId}`)
            .setLabel('Tags')
            .setStyle(ButtonStyle.Primary),
    ]);
    choiceButtons.addComponents([
        new ButtonBuilder()
            .setCustomId(`Releases_${visualNovelId}`)
            .setLabel('Releases')
            .setStyle(ButtonStyle.Primary),
    ]);
    const embedList = SFW_Screenshots.map((screenshot) => {
        return new EmbedBuilder()
            .setURL('https://s2.vndb.org/sf/')
            .setImage(screenshot.url);
    });
    await interaction.update({ embeds: embedList, components: [choiceButtons] });
};
