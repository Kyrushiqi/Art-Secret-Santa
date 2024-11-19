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
module.exports = {JoinSS, StartSS, LeaveSS}


//ImportEmbeds
const {
    JoinSSEmbed, JoinYesEmbed_Added, JoinYesEmbed_AlreadyExists, JoinNoEmbed
} = require('../Embeds/joinSS');

const {
    StartSSEmbed, StartSSRoasterStartedEmbed, StartSSNoEmbed, StartSSErrorEmbed
} = require('../Embeds/startSS')


//Start a new Roaster for the new year
async function StartSS(message) {   

    //Check to see if the roaster is currently active or not
    const res = IsRoasterActive();
    
    if(res === 0) {
        message.reply(`The roaster for ${currYear} has already been started`);
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

        if(res === 1){
            if(response.content === '!yes') {
                //Create a new folder and roaster
                const fileName = `Roaster${currYear}.json`
                fs.mkdirSync(path.join(pathToSanta, `/${currYear}`));
                fs.appendFile(path.join(pathToSanta, `${currYear}`, `${fileName}`), '{}', (err) => {
                    if(err) throw err;
                    console.log(`${fileName} has been created`)
                })
                response.reply({embeds : [StartSSRoasterStartedEmbed()]});
            }
            if(response.content === '!no') {
                response.reply({embeds : [StartSSNoEmbed()]});
            }
        }

        if(res === 2) {
            fs.appendFile(path.join(pathToSanta, `${currYear}`, `${fileName}`), '{}', (err) => {
                if(err) throw err;
                // console.log(`${fileName} has been created`)
                response.reply({embeds : [StartSSRoasterStartedEmbed()]});
            })
            response.reply({embeds : [StartSSErrorEmbed()]});
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
    const data = await readFile(filePath);
    let roaster = JSON.parse(data);

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
                    if(roaster.hasOwnProperty(key)) {
                        // console.log(`${key} is in the system`);
                        response.reply({embeds : [JoinYesEmbed_AlreadyExists()]});
                    } else {
                        //Keeping track of the state of the json file.
                        //For debugging
                        //console.log("Before Adding data",JSON.stringify(roaster, null, 4));

                        //Creating the new user in the json file
                        const newUser = {
                            "id" : [message.author.id],
                            "joined" : d.toDateString(),
                        }

                        //Add new User to the JSON File
                        roaster[key] = newUser;

                        const jsonString = JSON.stringify(roaster);
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
                message.reply("Current roaster has not been started, please wait for an admin to start it.");
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
    message.reply('So you wanna leave the roaster? Dafuq\nReply !yes or yes and !no for no');
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

//Check if roaster is active or not (Helper function)
// 1 = No path to the year
// 2 = No path to the roaster
// 0 = All files are there
function IsRoasterActive() {
    if(!fs.existsSync(path.join(pathToSanta, `/${currYear}`)))
        return 1;

    let pathToRoaster = path.join(pathToSanta, `/${currYear}`)

    if(!fs.existsSync(path.join(pathToRoaster, `/Roaster${currYear}.json`)))
        return 2;

    return 0;
}