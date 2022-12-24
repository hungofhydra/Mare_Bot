import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

import { getVisualNovelDetailEvent } from './getVisualNovelDetailEvent.js';
import { queryUserByName } from '../api/user/user.js';

const convertMinuteToHour = (minutes) => {
  const playtime_hours = Math.floor(minutes / 60);
  const playtime_minutes = minutes % 60;
  return `${playtime_hours.toString()} hours ${playtime_minutes.toString()} minutes`;
};

export const searchUserEvent = async (interaction) => {
  const userName = interaction.options.get('name').value;
  const user = await queryUserByName(userName);
  const choiceButtons = new ActionRowBuilder();

  //const choiceButtons = new ActionRowBuilder();

  if (user === null) {
    await interaction.reply({
      content: `There is no user with username ${userName}`,
      ephemeral: true,
    });
  } else {
    choiceButtons.addComponents([
      new ButtonBuilder()
        .setCustomId(`UserList_${user.id}`)
        .setLabel('View List')
        .setStyle(ButtonStyle.Primary),
    ]);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(userName)
      .setURL(`https://vndb.org/${user.id}`)
      .addFields(
        {
          name: 'Number of Play Time Votes',
          value: user.lengthvotes.toString(),
        },
        {
          name: 'Number of Play Time',
          value: convertMinuteToHour(user.lengthvotes_sum),
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], components: [choiceButtons] });
  }
};
