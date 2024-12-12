const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const ping = require('ping');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings the api url'),
    async execute(interaction) {

        try {
            const host = 'api.audibert.rest';
            const res = await ping.promise.probe(host);

            const embed = new EmbedBuilder()
                .setColor('#232428')
                .setDescription(`Host=**${host}** Status=${res.alive ? 'Online' : 'Offline'} Time=${res.time}ms`)
            const message = await interaction.reply({ embeds: [embed], fetchReply: true });

            
        } catch (error) {
        }
    },
};
