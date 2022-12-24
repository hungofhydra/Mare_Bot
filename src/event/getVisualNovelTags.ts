import { queryVisualNovelById } from '../api/visualnovel/visualnovel.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

export const getVisualNovelTags = async (interaction) => {
  const visualNovelId = interaction.customId.split('_')[1];
  const visualNovel = await queryVisualNovelById(visualNovelId);
  const visualNovelDetail = visualNovel[0];
  const choiceButtons = new ActionRowBuilder();
  const noSpoilerTags = visualNovelDetail.tags
    .filter((tag) => {
      return tag.spoiler === 0;
    })
    .sort((a, b) => b.rating - a.rating);

  const tagsInformation = noSpoilerTags.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      `${currentValue.name} : ${(
        Math.round(currentValue.rating * 10) / 10
      ).toString()}\n`
    );
  }, '');
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

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(visualNovelDetail.title)
    .setURL(`https://vndb.org/${visualNovelDetail.id}`)
    .setDescription(tagsInformation)
    .setImage(
      visualNovelDetail.image.url && visualNovelDetail.image.sexual === 0
        ? visualNovelDetail.image.url
        : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
    )
    .setTimestamp();

  await interaction.update({
    embeds: [embed],
    components: [choiceButtons],
  });
};
