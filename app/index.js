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
const {JoinSSEmbed} = require('../Embeds/joinSS.js');

//Import Commands
const {JoinSS} = require('../JAVASCRIPT/Commands.js');

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


//Start Secret Santa for the year
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


//Adding people into the Secret Santa roaster
client.on("messageCreate", async (message) => {
    // console.log(message)
    if(message.author.bot) {
        return;
    }

    const d = new Date();
    const currYear = d.getFullYear();
    const filePath = path.join(SSFielPath, `/${currYear}`, `/Roaster${currYear}.json`);
    
    if(message.content === "!JoinSS") {
        JoinSS(filePath, message);
    }
});

async function readFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.log("Error reading file info.")
        console.error(err);
    }
}