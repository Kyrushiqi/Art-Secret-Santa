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

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/Commands');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToRoster = path.join(pathToSanta, `/Roster${currYear}.json`);


//Date
const d = new Date();
currYear = d.getFullYear();


async function RandomizePeople() {
    if (!IsRosterActive === 0) {
        console.log('Error Randomizing People {Roster doesnt exist}');
        return;
    };

    const dataJson = await readFile(pathToRoster);
    const data = JSON.parse(dataJson);

    if(len(data) === 0) {
        console.log('Roster is empty');
        return;
    }

    const users = [];
}