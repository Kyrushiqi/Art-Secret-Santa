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

//Notes

//Export Functions
module.exports = {
    DisplayRoster
}

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/SSCommands.js');

const {
    DisplayRosterEmbed
} = require('../Embeds/display.js');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToRoster = path.join(pathToSanta, `/${currYear}`, `/Roster${currYear}.json`);


//Date
const d = new Date();
currYear = d.getFullYear();

async function DisplayRoster(message) {
    const roaster = IsRosterActive();

    // Return if roaster is not yet active
    if(roaster === 1 || roaster === 2) {
        message.reply('Roaster is not yet active');
        console.log('Roaster is not yet active');
        return;
    }


    const dataJson = await readFile(pathToRoster);
    const data = JSON.parse(dataJson);

    const users = [];

    for(const key of Object.keys(data)) {
        users.push(key);
    }

    message.reply({embeds: [DisplayRosterEmbed(users)]});
}
