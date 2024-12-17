const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const axios = require('axios');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const API_URL = process.env.API_URL;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();


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

const pingAPI = async () => {
    while (true) {
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
                console.log('API is online!');
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