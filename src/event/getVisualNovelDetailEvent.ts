import { queryVisualNovelById } from '../api/visualnovel/visualnovel.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
const Length = {
  '1': 'Very Short',
  '2': 'Short',
  '3': 'Medium',
  '4': 'Long',
  '5': 'Very Long',
};
const convertMinuteToHour = (minutes) => {
  const playtime_hours = Math.floor(minutes / 60);
  const playtime_minutes = minutes % 60;
  return `${playtime_hours.toString()} hours ${playtime_minutes.toString()} minutes`;
};

const convertDate = (date) => {
  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];
  return `${day}-${month}-${year}`;
};

export const getVisualNovelDetailEvent = async (
  interaction,
  method = 'update'
) => {
  const visualNovelId = interaction.customId.split('_')[1];
  const visualNovel = await queryVisualNovelById(visualNovelId);
  const visualNovelDetail = visualNovel[0];
  const choiceButtons = new ActionRowBuilder();

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
    .setDescription(
      visualNovelDetail.description
        ? visualNovelDetail.description
            .replace('[spoiler]', '||')
            .replace('[/spoiler]', '||')
        : ' '
    )
    .addFields(
      {
        name: 'Alternative title',
        value: visualNovelDetail.alttitle ? visualNovelDetail.alttitle : 'None',
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Rating',
        value: visualNovelDetail.rating
          ? visualNovelDetail.rating.toString()
          : 'None',
        inline: true,
      },
      {
        name: 'Release Day',
        value: visualNovelDetail.released
          ? convertDate(visualNovelDetail.released)
          : 'None',
        inline: true,
      }
    )
    .addFields({
      name: 'Play time',
      value: visualNovelDetail.length_minutes
        ? convertMinuteToHour(visualNovelDetail.length_minutes)
        : Length[visualNovelDetail.length]
        ? Length[visualNovelDetail.length.toString()]
        : 'None',
      inline: true,
    })
    .setImage(
      visualNovelDetail.image.url && visualNovelDetail.image.sexual === 0
        ? visualNovelDetail.image.url
        : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
    )
    .setTimestamp();

  switch (method) {
    case 'reply':
      await interaction.reply({ embeds: [embed], components: [choiceButtons] });
      break;
    case 'update':
      await interaction.update({
        embeds: [embed],
        components: [choiceButtons],
      });
      break;
    default:
      break;
  }
};
