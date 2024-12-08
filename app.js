require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Carregando as variáveis de ambiente
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const API_URL = process.env.API_URL;

// Criando o cliente do bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    pingAPI(); // Inicia a tarefa de pingar a API
});

// Função para pingar a API
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
        // Aguarda 10 minutos (600 segundos) antes de fazer a próxima requisição
        await new Promise(resolve => setTimeout(resolve, 600000));
    }
};

// Inicia o bot
client.login(DISCORD_TOKEN);
