import { queryVisualNovelById } from '../api/visualnovel/visualnovel.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, } from 'discord.js';
const Length = {
    1: 'Very Short',
    2: 'Short',
    3: 'Medium',
    4: 'Long',
    5: 'Very Long',
};
const convertMinuteToHour = (minutes) => {
    const playtime_hours = Math.floor(minutes / 60);
    const playtime_minutes = minutes % 60;
    return `${playtime_hours.toString()} hours ${playtime_minutes.toString()} minutes`;
};
export const getVisualNovelDetailEvent = async (interaction) => {
    const visualNovelId = interaction.customId.split('_')[1];
    const visualNovel = await queryVisualNovelById(visualNovelId);
    const visualNovelDetail = visualNovel[0];
    const choiceButtons = new ActionRowBuilder();
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
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(visualNovelDetail.title)
        .setURL(`https://vndb.org/${visualNovelDetail.id}`)
        .setDescription(visualNovelDetail.description)
        .addFields({
        name: 'Alternative title',
        value: visualNovelDetail.alttitle ? visualNovelDetail.alttitle : 'None',
    }, { name: '\u200B', value: '\u200B' }, {
        name: 'Rating',
        value: visualNovelDetail.rating.toString(),
        inline: true,
    }, {
        name: 'Release Day',
        value: visualNovelDetail.released ? visualNovelDetail.released : 'None',
        inline: true,
    })
        .addFields({
        name: 'Play time',
        value: visualNovelDetail.length_minutes
            ? convertMinuteToHour(visualNovelDetail.length_minutes)
            : Length[visualNovelDetail.length],
        inline: true,
    })
        .setImage(visualNovelDetail.image.url)
        .setTimestamp();
    await interaction.reply({ embeds: [embed], components: [choiceButtons] });
};
