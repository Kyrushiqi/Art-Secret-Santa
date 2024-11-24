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


// Notes:
// Need to setup a way to assign individual people just in case

//Export Functions
module.exports = {
    RandomizePeople, IsMapActive
}

//Import Functions
const {
    readFile, IsRosterActive
} = require('../JAVASCRIPT/SSCommands.js');

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToRoster = path.join(pathToSanta, `/${currYear}`, `/Roster${currYear}.json`);


//Date
const d = new Date();
currYear = d.getFullYear();


async function RandomizePeople(message) {
    //Checking is rosters active
    if (IsRosterActive() == 1 || IsRosterActive() == 2) {
        message.reply("Roaster hasn't been started");
        console.log('Error Randomizing People {Roster doesnt exist}');
        return;
    };

    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };

    //Setting up response stuff
    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    //Do this if people have already been assigned
    if(IsMapActive() == 0) {
        message.reply('People have already been assigned, to reassign type !yes or anything to not reassign');
        collector.on('collect', response => {
            if(response.content !=='!yes') {
                //Replace with embed
                response.reply('Sounds good boss, we wont reassign');
                return;
            }
            Randomize(message)
            response.reply('People have been reassigned');
            collector.on('end', collected => {
                if(collected.size === 0) {
                    message.channel.send(`Thanks for wasting my time ${message.author}`);
                }
            })
        });
    } else {
        //Otherwise assign them
        Randomize(message);
        //Replace with embed
        message.reply('People have been assigned');
    }
}

async function Randomize(message) {
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
        message.reply(`${lastPerson} was left without a partner because there weren't enough people`);
    }

    //Randomize the remaining array
    const shuffled = users;
    ShuffleArray(shuffled);


    //Shuffle Array to make sure no one is assigned themselves
    const pairings = {};
    for (let i = 0; i < users.length; i++) {
        // Assign the next person in the shuffled list as the pair
        pairings[users[i]] = shuffled[(i + 1) % users.length];
    }

    //Make a map of the randomized list
    const map = new Map();
    for (const [key, value] of Object.entries(pairings)) {
        map.set(key, value);
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
            // console.log(`Data has been written to ${pathToMap}`);
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

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}