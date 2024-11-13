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

const d = new Date();

//Export Commands
module.exports = {JoinSS}


//ImportEmbeds
const {
    JoinSSEmbed, JoinYesEmbed_Added, JoinYesEmbed_AlreadyExists
} = require('../Embeds/joinSS');

async function JoinSS(filePath, message) {
    console.log(filePath)
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
                        response.reply({embeds : [JoinYesEmbed_AlreadyExists()]});
                    } else {
                        //Keeping track of the state of the json file.
                        // For debugging
                        // console.log("Before Adding data",JSON.stringify(roaster, null, 4));

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
                        // console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
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