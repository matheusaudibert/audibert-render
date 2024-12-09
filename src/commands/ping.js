const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const ping = require('ping');

const ALLOWED_CHANNEL_ID = '1315464652490150020';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings the api url'),
    async execute(interaction) {
      if (interaction.channelId !== ALLOWED_CHANNEL_ID) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#232428')
                .setDescription('Use commands on <#1315464652490150020> channel.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: false });
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 5000);
            return;
        }
        try {
            const host = 'api.audibert.rest';
            const res = await ping.promise.probe(host);

            const embed = new EmbedBuilder()
                .setColor('#232428')
                .setDescription(`Host=**${host}** Status:${res.alive ? 'Online=' : 'Offline='} Time=${res.time}ms`)
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });

            
        } catch (error) {
        }
    },
};
