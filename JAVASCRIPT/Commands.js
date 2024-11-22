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

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');


//Date
const d = new Date();
currYear = d.getFullYear();


//Export Commands
module.exports = {
    JoinSS, StartSS, LeaveSS, readFile, IsRosterActive, GetPathToRoster, GetCurrentDateAndTime,
    IsUserInRoster
}


//ImportEmbeds
const {
    JoinSSEmbed, JoinYesEmbed_Added, JoinYesEmbed_AlreadyExists, JoinNoEmbed
} = require('../Embeds/joinSS');

const {
    StartSSEmbed, StartSSRosterStartedEmbed, StartSSNoEmbed, StartSSErrorEmbed, StartSSExistsEmbed
} = require('../Embeds/startSS');

const {
    LeaveSSEmbed, LeaveSSYesEmbed, LeaveSSNOEmbed, LeaveSSExistsEmbed
} = require('../Embeds/leaveSS');


//Start a new Roster for the new year
async function StartSS(message) {   

    //Check to see if the roster is currently active or not
    const res = IsRosterActive();
    
    if(res === 0) {
        message.reply({embeds : [StartSSExistsEmbed()]});
        return;
    }
    
    message.reply({embeds : [StartSSEmbed()]});

    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };

    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    collector.on('collect', response => {
        if(response.author.bot) return;
        const fileName = `Roster${currYear}.json`;

        if(res === 1){
            if(response.content === '!yes') {
                //Create a new folder and roster
                fs.mkdirSync(path.join(pathToSanta, `/${currYear}`));
                fs.appendFile(path.join(pathToSanta, `/${currYear}`, `/${fileName}`), '{}', (err) => {
                    if(err) throw err;
                    console.log(`${fileName} has been created`)
                })
                response.reply({embeds : [StartSSRosterStartedEmbed()]});
            }
            if(response.content === '!no') {
                response.reply({embeds : [StartSSNoEmbed()]});
            }
        }

        if(res === 2) {
            fs.appendFile(path.join(pathToSanta, `/${currYear}`, `/${fileName}`), '{}', (err) => {
                if(err) throw err;
                // console.log(`${fileName} has been created`)
                response.reply({embeds : [StartSSErrorEmbed()]});
            })
        }


        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    });
}


//Register the user for the current years Secret Santa
async function JoinSS(filePath, message) {
    //Check to see if the roster is currently active or not
    const res = IsRosterActive();

    if(res === 1 || res == 2) {
        message.reply('Roaster hasnt been started');
        return;
    }
    
    const data = await readFile(filePath);
    let roster = JSON.parse(data);

    message.reply({embeds : [JoinSSEmbed()]});

    const filter = response => {
        return response.author.id == message.author.id;
    };

    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    collector.on('collect', response => {
        if(response.author.bot) return;

        
        if(response.content === "!yes") {
            if(fs.existsSync(filePath)) {
                try {
                    var key = message.author.displayName;
                    if(roster.hasOwnProperty(key)) {
                        // console.log(`${key} is in the system`);
                        response.reply({embeds : [JoinYesEmbed_AlreadyExists()]});
                    } else {
                        //Keeping track of the state of the json file.
                        //For debugging
                        //console.log("Before Adding data",JSON.stringify(roster, null, 4));

                        //Creating the new user in the json file
                        const newUser = {
                            "id" : message.author.id,
                            "joined" : GetCurrentDateAndTime(),
                        }

                        //Add new User to the JSON File
                        roster[key] = newUser;

                        const jsonString = JSON.stringify(roster);
                        fs.writeFileSync(filePath, jsonString, 'utf-8', (err) => {
                            if(err) throw err;
                        });

                        response.reply({embeds : [JoinYesEmbed_Added()]});

                        //Updates and tracks how the file looks (prints out the json file)
                        const update_data = fs.readFileSync(filePath);
                        const updated_jsonData = JSON.parse(update_data);
                        //For debugging
                        //console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
                    }
                } catch (e) {
                    console.error("Error reading file: ", e);
                }
            } else {
                message.reply("Current roster has not been started, please wait for an admin to start it.");
            }
        } else if(response.content === "!no") {
            response.reply({embeds : [JoinNoEmbed()]});
        }
    })

    //What the bot does if the person doesn't respond
    collector.on('end', collected => {
        if(collected.size === 0) {
            message.channel.send(`Thanks for wasting my time ${message.author}`);
        }
    })
}


async function LeaveSS(message) {
    //Check to see if user is in the system or not
    try{
        const res = await IsUserInRoster(message);
        if(res == false) {
            message.reply({embeds : [LeaveSSExistsEmbed()]});
            return;
        }
    } catch (e) {
        console.error(e);
        return;
    }

    message.reply({embeds : [LeaveSSEmbed()]});
    
    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };

    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    const rosterPath = GetPathToRoster(currPath, currYear);
    const dataJSON = await readFile(rosterPath);

    collector.on('collect', response => {

        if(response.content === '!yes') {
            const data = JSON.parse(dataJSON);

            const userToDelete = message.author.displayName;

            delete data[userToDelete];

            let updatedJson = JSON.stringify(data, null, 2);

            fs.writeFileSync(rosterPath, updatedJson, 'utf-8')

            //Replace with embed
            response.reply({embeds : [LeaveSSYesEmbed()]});
        }

        if(response.content === '!no') {
            response.reply({embeds : [LeaveSSNOEmbed()]});
            return;
        }
    });

    //What the bot does if the person doesn't respond
    collector.on('end', collected => {
        if(collected.size === 0) {
            message.channel.send(`Thanks for wasting my time ${message.author}`);
        }
    })
}


//Helper function
async function readFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.log("Error reading file info.")
        console.error(err);
    }
}

//Check if roster is active or not (Helper function)
// 1 = No path to the year
// 2 = No path to the roster
// 0 = All files are there
function IsRosterActive() {
    if(!fs.existsSync(path.join(pathToSanta, `/${currYear}`)))
        return 1;

    let pathToRoster = path.join(pathToSanta, `/${currYear}`)

    if(!fs.existsSync(path.join(pathToRoster, `/Roster${currYear}.json`)))
        return 2;

    return 0;
}

async function IsUserInRoster(message) {
    if(!fs.existsSync(path.join(pathToSanta, `/${currYear}`)))
        throw new Error('File path does not exist in Santa directory');

    let pathToRoster = path.join(pathToSanta, `/${currYear}`)

    if(!fs.existsSync(path.join(pathToRoster, `/Roster${currYear}.json`)))
        throw new Error('Roster does not exist');

    let currPath = path.join(pathToRoster, `/Roster${currYear}.json`);

    const dataJson = await readFile(currPath);
    const data = JSON.parse(dataJson);

    for(const key of Object.keys(data)) {
        // console.log(`${key} -> ${message.author.displayName}`);
        if(key === message.author.displayName) {
            return true;
        }
    }

    return false;
}

function GetPathToRoster(filepath, year) {
    return path.join(filepath, '..', '/SantaFiles', `/${year}`, `/Roster${year}.json`);
}

function GetCurrentDateAndTime() {
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDay();
    const time = d.toLocaleTimeString("en-US", {timeZone: 'America/New_York'}).replace(/\s/g, "");
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const finishedDate = `${year}-${month}-${day}T${time}-${timezone}`;
    return finishedDate;
}