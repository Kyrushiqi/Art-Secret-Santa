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

//Import Commands
const {JoinSS, StartSS, LeaveSS} = require('../JAVASCRIPT/Commands.js');


//PATHS
const parentFile = __dirname;
const SSFilePath = path.join(parentFile, "..", "/SantaFiles")

client.login(process.env.DISCORD_TOKEN);

//Discord bot logs on
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});


///////////////////////////////////////////////////////
            //Start of commands (temp setup)
///////////////////////////////////////////////////////

//List help commands
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    if (message.content === '!help') {
        message.reply({embeds : [HelpEmbed()]});
    }
});


//Start Secret Santa for the year
client.on("messageCreate", async (message) => {
    // console.log(message);

    if(message.author.bot) return;

    if(message.content === "!StartSS") {

        //Add checks for if user is admin or not

        StartSS(message);
    }
})


//Adding people into the Secret Santa roaster
client.on("messageCreate", async (message) => {
    // console.log(message)
    if(message.author.bot) {
        return;
    }

    ////////////////////////////////
    //Create check to see if roaster is started or not
    ////////////////////////////////

    const filePath = path.join(SSFilePath, `/${currYear}`, `/Roaster${currYear}.json`);

    if(message.content === "!JoinSS") {
        JoinSS(filePath, message);
    }
});

//Opting out of the Secret Sanaa
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    if(message.content === "!LeaveSS") {
        
    }
});