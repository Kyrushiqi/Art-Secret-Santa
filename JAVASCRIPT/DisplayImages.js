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
    IsRosterActive
} = require('../JAVASCRIPT/SSCommands.js');

const {
    IsMapActive
} = require('../JAVASCRIPT/Randomizer.js');

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
    const rosterActive = IsRosterActive();
    const mapActive = IsMapActive();
    const imageActive = IsImageActive();

    try {
        const files = fs.readdirSync(path.join(pathToImage, `/${message.author.displayName}`));
        const images = files.filter(file => {
            //Only grab valid images
            const extension = path.extname(file).toLowerCase();
            return extension === '.jpeg' || extension === '.jpg' || extension === '.png' || extension === '.gif'
        });
        
        message.reply({embeds : [DisplayImagesEmbed(images)]});
    } catch (e) {
        console.error('Error trying to read in images: ', e);
    }
}

