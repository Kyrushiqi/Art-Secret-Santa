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

//Export Functions
module.exports = {
    RandomizePeople
}

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/Commands');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToRoster = path.join(pathToSanta, `/${currYear}`, `/Roster${currYear}.json`);


//Date
const d = new Date();
currYear = d.getFullYear();


async function RandomizePeople(message) {
    if(IsMapActive() == 0) {
        message.reply('People have already been assigned');
        console.log('People already randomized');
        return;
    }

    //Checking is rosters active
    if (IsRosterActive() == 1 || IsRosterActive() == 2) {
        message.reply("Roaster hasn't been started");
        console.log('Error Randomizing People {Roster doesnt exist}');
        return;
    };

    //Getting JSON info
    const dataJson = await readFile(pathToRoster);
    const data = JSON.parse(dataJson);

    // Is roaster empty?
    if(!Object.keys(data).length === 0) {
        console.log('Roster is empty');
        return;
    }

    //Pushing users into array
    const users = [];
        for(const key of Object.keys(data)) {
        users.push(key);
    }

    let lastPerson = null;
    //Check to see if the amount of people are even or odd
    if(Object.keys(data).length % 2 != 0) {
        lastPerson = users.pop();
        //Replace with embed
        console.log(`${lastPerson} was left without a partner because there weren't enough people`);
    }

    // Randomize the remaining array
    for (let i = users.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // Get a random index
        // Swap the current element with the randomly chosen one
        [users[i], users[randomIndex]] = [users[randomIndex], users[i]];
    }

    //Make a map of the randomized list
    const map = new Map();
    for (let i = 0; i < users.length; i += 2) {
        const person1 = users[i];
        const person2 = users[i + 1];
        map.set(person1, person2);
    }


    // Convert the Map to a plain object for JSON serialization
    const usersObject = Object.fromEntries(map);

    // Include the unpaired person if any
    if (lastPerson) {
        usersObject[lastPerson] = null; // Add them with no partner
    }

    //Write the file to JSON
    const pathToMap = path.join(pathToSanta, `/${currYear}`, `/Map${currYear}.json`);
    fs.writeFile(pathToMap, JSON.stringify(usersObject, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`Data has been written to ${pathToMap}.json`);
        }
    });
}

//Helper function
// 1 = No path to the year
// 2 = No path to the roster
// 0 = All files are there
function IsMapActive() {
    if(!fs.existsSync(path.join(pathToSanta, `/${currYear}`)))
        return 1;

    let pathToMap = path.join(pathToSanta, `/${currYear}`)

    if(!fs.existsSync(path.join(pathToMap, `/Map${currYear}.json`)))
        return 2;

    return 0;
}