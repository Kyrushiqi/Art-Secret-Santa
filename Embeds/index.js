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
const {JoinSS, StartSS, LeaveSS} = require('../JAVASCRIPT/SSCommands.js');
const {RandomizePeople} = require('../JAVASCRIPT/Randomizer.js');
const {Display} = require('../JAVASCRIPT/DisplayRoster.js');
const {DisplayImages} = require('../JAVASCRIPT/DisplayImages.js');
const {UploadImage} = require('../JAVASCRIPT/UploadImage.js');


//PATHS
const parentFile = __dirname;
const SSFilePath = path.join(parentFile, "..", "/SantaFiles")
const filePath = path.join(SSFilePath, `/${currYear}`, `/Roster${currYear}.json`);

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

    message.content = message.content.toLowerCase();

    console.log(message.content);

    //List commands
    if (message.content === '!help') {
        message.reply({embeds : [HelpEmbed()]});
    }

    //Join secret santa
    if(message.content === "!joinss") {
        JoinSS(message);
    }

    //Leave the secert santa
    if(message.content === "!leavess") {
        LeaveSS(message);
    }

    //Upload images
    if(message.content === "!upload") {
        UploadImage(message);
    }

    if(message.content === "!images") {
        DisplayImages(message);
    }


    /////////////////////////
    //Admin commands
    /////////////////////////

    if(message.content === "!startss") {

        //Add checks for if user is admin or not

        StartSS(message);
    }

    //Assign people
    if(message.content === "!randomize") {
        RandomizePeople(message);
    }

    if(message.content === "!displayRos") {
        
        //Add checks for if user is admin or not

        Display(message);
    } 
});