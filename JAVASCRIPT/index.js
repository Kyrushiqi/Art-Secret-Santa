// Initializes environment (.env)
require('dotenv').config();
const path = require('path');
const fs = require('fs');

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

//Import embeds
const {HelpEmbed} = require('../Embeds/help.js');
const {JoinSSEmbed} = require('../Embeds/JoinSS.js');

//PATHS
const parentFile = __dirname;
const SSFielPath = path.join(parentFile, "..", "/SantaFiles")

client.login(process.env.DISCORD_TOKEN);

//Discord bot logs on
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    // console.log(message)

    if (!message?.author.bot){
        // message.author.send(`Echo ${message.content}`);
    }
});




///////////////////////////////////////////////////////
            //Start of commands (temp setup)
///////////////////////////////////////////////////////

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    if (message.content === '!help') {
        message.reply({embeds : [HelpEmbed()]});
    }
});


//Start Secrete Santa for the year
client.on("messageCreate", async (message) => {
    // console.log(message);

    if(message.author.bot) return;

    if(message.content === "!startSS") {
        const currYear = new Date().getFullYear();
        
       const  filePath = path.join(SSFielPath, `/${currYear}`, `/Roaster${currYear}.json`);

        //Check to see if fiel exits and if it needs to be created
        if(fs.existsSync(filePath)) {
            try {
                const data = await readFile(filePath);
                const users = JSON.parse(data);
                console.log(users.id);

            } catch (e) {
                console.error("Error reading file: ", e);
            }
        } else {
            message.reply("Current roaster has not been started, Would you like to start it?");
        }

    }
})


//Adding people into the Secrete Santa roaster
client.on("messageCreate", async (message) => {
    // console.log(message)
    if(message.author.bot) {
        return;
    }

    const d = new Date();
    const currYear = d.getFullYear();
    const filePath = path.join(SSFielPath, `/${currYear}`, `/Roaster${currYear}.json`);

    if(message.content === "!JoinSS") {
        const data = await readFile(filePath);
        let roaster = JSON.parse(data);
        // console.log(roaster);

        message.reply({embeds : [JoinSSEmbed()]});
        // message.reply(`Would you like to join Secret Santa for ${new Date().getFullYear()}?`);

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
                            response.reply(`You are already in the system as ${key}, but thanks for making sure you registered!`);
                        } else {
                            //Keeping track of the state of the json file.
                            console.log("Before Adding data",JSON.stringify(roaster, null, 4));
                            
                            console.log(`${key} is not in the system`);          

                            //Creating the new user int the json file
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
                            response.reply(`Congrats ${message.author.displayName}! You've been added into the secret santa roaster for ${currYear}`);

                            //Updates and tracks how the file looks (prints out the json file)
                            const update_data = fs.readFileSync(filePath);
                            const updated_jsonData = JSON.parse(update_data);
                            console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
                        }
                    } catch (e) {
                        console.error("Error reading file: ", e);
                    }
                } else {
                    message.reply("Current roaster has not been started, please wait for an admin to start it.");
                }
            } else if(response.content === "!no") {
                response.reply("No problem, have a great day without santa");
            }
        })

        //What the bot does if the person doesn't respond
        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    }
});


async function readFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.log("Error reading file info.");
    }
}