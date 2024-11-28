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
const {HelpEmbed} = require('../Embeds/helpUser.js');
const {HelpAdminEmbed} = require('../Embeds/helpAdmin.js');

//Import Commands
const {JoinSS, StartSS, LeaveSS} = require('../JAVASCRIPT/SSCommands.js');
const {RandomizePeople} = require('../JAVASCRIPT/Randomizer.js');
const {Display} = require('../JAVASCRIPT/DisplayRoster.js');
const {DisplayImages} = require('../JAVASCRIPT/DisplayImages.js');
const {UploadImage} = require('../JAVASCRIPT/UploadImage.js');
const {Notify} = require('../JAVASCRIPT/notifyAll.js');


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

    //List commands
    if (message.content === '!help') {

        //Check if user is admin
        //If not display regular help embed
        //If they are then display admin embed

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

    //Temp for testing
    if(message.content === '!helpadmin') {
        message.reply({embeds: [HelpAdminEmbed()]})
    }

    //Wrap all these in an if statement to check if the user is admin or not
    
    if(message.content === "!startss") {


        StartSS(message);
    }

    //Assign people
    if(message.content === "!randomize") {


        RandomizePeople(message);
    }

    //Display either roster or pairs
    if(message.content === "!display") {
        
        Display(message);
    }  

    //Notify everyone who registered what their pair is (Plan on making a way to notify individuals)
    if(message.content === "!notify") {

    }  
});