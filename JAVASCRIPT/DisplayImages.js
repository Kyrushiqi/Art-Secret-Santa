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
    DisplayImages
}

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/SSCommands.js');

const {
    IsImageActive
} = require('../JAVASCRIPT/UploadImage.js');


//Import Embeds
const {
    DisplayImagesEmbed
} = require('../Embeds/display.js');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToImage = path.join(pathToSanta, `/${currYear}`, `/Images`);


//Date
const d = new Date();
currYear = d.getFullYear();

async function DisplayImages(message) {
    const rosterActive = await IsRosterActive();
    const imageActive = await IsImageActive();

    if(rosterActive === 1 || rosterActive === 2) {
        console.log('Roster not yet started');
        message.reply({embeds: [WaitForRosterEmbed()]});
        return;
    }
    if(imageActive === 1 || imageActive === 2) {
        message.reply({embeds: [WaitForImagesEmbed()]});
        console.log('Images not yet started');
        return;
    }
    
    try {
        const user = message.author.displayName;
        const userJson = path.join(pathToImage, `/${user}`, `/${user}.json`);

        const data = await readFile(userJson);
        const res = JSON.parse(data);

        message.reply({embeds: [DisplayImagesEmbed(res, user)]})

    } catch (e) {
        console.error('Error trying to read in images: ', e);
    }
}