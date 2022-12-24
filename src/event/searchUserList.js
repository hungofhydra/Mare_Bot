import { EmbedBuilder } from 'discord.js';
import { queryUserListByUserId } from '../api/user/user.js';
export const searchUserList = async (interaction) => {
    const userId = interaction.customId.split('_')[1];
    const userList = await queryUserListByUserId(userId);
    let message = '';
    if (userList.length > 0) {
        userList.forEach((vote) => {
            message += `[${vote.vn.title} : ${(vote.vote / 10).toString()}](https://vndb.org/${vote.id})\n`;
        });
    }
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Vote List')
        .setURL(`https://vndb.org/${userId}/ulist?votes=1`)
        .setDescription(userList.length > 0 ? message : "This user hasn't voted any Visual Novel")
        .setTimestamp();
    await interaction.update({ embeds: [embed] });
};
