const fs = require('fs');
const path = require('path');
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

//Import functions
const {readFile} = require('../JAVASCRIPT/SSCommands.js');


module.exports = {
    Notify
}

async function Notify(message) {

    message.reply(`This will let everyone know who they've been paired up with. If you want to proceed reply with !yes. If not repond with anything else`);



    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };

    //Setting up response stuff
    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    collector.on('collect', response => {

        if(response.content !== '!yes') {
            const data = readFile();
        }

        response.reply('No problem, we won\'t notify anyone.');

        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    });
}