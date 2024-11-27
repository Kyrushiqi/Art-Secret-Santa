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
    Display
}

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/SSCommands.js');

const {
    IsMapActive
} = require('../JAVASCRIPT/Randomizer.js');


//Import Embeds
const {
    DisplayRosterEmbed, DisplayAssignmentsEmbed,
    ChocieEmbed
} = require('../Embeds/display.js');

const {
    WaitForRosterEmbed, WaitForImagesEmbed
} = require('../Embeds/waitForEmbeds.js');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToRoster = path.join(pathToSanta, `/${currYear}`, `/Roster${currYear}.json`);
let pathToMap = path.join(pathToSanta, `/${currYear}`, `/Map${currYear}.json`);


//Date
const d = new Date();
currYear = d.getFullYear();


async function Display(message) {

    message.reply({embeds: [ChocieEmbed()]});

    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };

    //Setting up response stuff
    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    collector.on('collect', response => {
        response.content = response.content.toLowerCase();

        if(response.content ==='!roster') {
            DisplayRoster(response);
            return;
        }
        if(response.content === '!pairs' || response.content === '!pair') {
            DisplayAssignments(response);
            return;
        }
        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    });
}

async function DisplayRoster(response) {
    const roaster = IsRosterActive();

    // Return if roaster is not yet active
    if(roaster === 1 || roaster === 2) {
        message.reply({embeds: [WaitForRosterEmbed()]});
        console.log('Roaster is not yet active');
        return;
    }


    const dataJson = await readFile(pathToRoster);
    const data = JSON.parse(dataJson);

    const users = [];

    for(const key of Object.keys(data)) {
        users.push(key);
    }

    response.reply({embeds: [DisplayRosterEmbed(users)]});
}

async function DisplayAssignments(response) {
    const roaster = IsRosterActive();

    const map = IsMapActive();

    // Return if roaster is not yet active
    if(roaster === 1 || roaster === 2) {
        message.reply({embeds: [WaitForRosterEmbed()]});
        console.log('Roaster is not yet active');
        return;
    }

    if(map === 1 || map === 2) {
        message.reply({embeds: [WaitForImagesEmbed()]});
        console.log('No one has been assigned yet');
        return;
    }

    const dataJson = await readFile(pathToMap);
    const data = JSON.parse(dataJson);

    const users = {};

    for(const [key, value] of Object.entries(data)) {
        users[key] = value;
    }

    response.reply({embeds : [DisplayAssignmentsEmbed(users)]});
}
