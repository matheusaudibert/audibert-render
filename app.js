require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const API_URL = process.env.API_URL;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    client.user.setPresence({
    activities: [
        {
            name: 'api status: online',
            type: ActivityType.Watching,
        }
    ],
    });
    pingAPI();
});

const pingAPI = async () => {
    while (true) {
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
                console.log('Success!');
            } else {
                console.log(`Error! Status Code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 600000));
    }
};

// Inicia o bot
client.login(DISCORD_TOKEN);
