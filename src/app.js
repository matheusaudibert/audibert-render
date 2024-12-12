const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const API_URL = process.env.API_URL;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();


exec('node commands.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro ao executar commands.js: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`${stderr}`);
        return;
    }
    console.log(`${stdout}`);
});

const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    client.user.setPresence({
        activities: [
            {
                name: 'api status',
                type: ActivityType.Watching,
            }
        ],
    });
    console.log('Bot está online!');
    pingAPI();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Erro ao executar o comando ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
    }
});

const pingAPI = async () => {
    while (true) {
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
            } else {
                console.log(`Error! Status Code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 600000));
    }
};

client.login(DISCORD_TOKEN);