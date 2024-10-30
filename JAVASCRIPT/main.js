const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        //Add more permission (intents) here
    ]
});

//Imports dotenv variables
require('dotenv').config();


//Discord bot logs on
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

//Basics of having the bot message based on messages
client.on("message", msg => {
    if(msg.content === "ping") {
        msg.reply("pong");
    }
});

console.log(process.env.TOKEN);

// client.login(process.env.TOKEN)