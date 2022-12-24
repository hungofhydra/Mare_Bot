import { queryVisualNovelReleases } from '../api/visualnovel/visualnovel.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

const convertDate = (date) => {
  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];
  return `${day}-${month}-${year}`;
};

export const getVisualNovelReleases = async (interaction) => {
  const visualNovelId = interaction.customId.split('_')[1];
  const visualNovelReleases = await queryVisualNovelReleases(visualNovelId);
  const choiceButtons = new ActionRowBuilder();
  let release_EN = '';
  let release_JP = '';
  let release_VI = '';

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

  visualNovelReleases.map((release) => {
    switch (release.languages[0].lang) {
      case 'en':
        release_EN += `[${
          release.released !== 'TBA' ? convertDate(release.released) : 'TBA'
        } | ${release.platforms[0]} | ${release.title} | ${
          release.patch === true ? '(Patch)' : ''
        }](${release.extlinks[0] ? release.extlinks[0].url : ''})\n`;
        break;
      case 'ja':
        release_JP += `[${
          release.released !== 'TBA' ? convertDate(release.released) : 'TBA'
        } | ${release.platforms[0]} | ${release.title} | ${
          release.patch === true ? '(Patch)' : ''
        }](${release.extlinks[0] ? release.extlinks[0].url : ''})\n`;
        break;
      case 'vi':
        release_VI += `[${
          release.released !== 'TBA' ? convertDate(release.released) : 'TBA'
        } | ${release.platforms[0]} | ${release.title} | ${
          release.patch === true ? '(Patch)' : ''
        }](${release.extlinks[0] ? release.extlinks[0].url : ''})\n`;
        break;
      default:
        break;
    }
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('List of releases')
    .setTimestamp().setDescription(` ${
    release_EN !== '' ? '**English :flag_gb: **\n' + release_EN : ''
  }\n 
    ${release_JP !== '' ? '**Japanese :flag_jp: **\n' + release_JP : ''}\n 
    ${release_VI !== '' ? '**Vietnamese :flag_vn: **\n' + release_VI : ''}\n 
    `);

  await interaction.update({ embeds: [embed], components: [choiceButtons] });
};
