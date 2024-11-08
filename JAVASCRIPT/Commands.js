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


async function JoinSS() {
    const currYear = d.getFullYear();
    const filePath = path.join(SSFielPath, `/${currYear}`, `/Roaster${currYear}.json`);

    if(message.content === "!joinSS") {
        const data = await readFile(filePath);
        let roaster = JSON.parse(data);
        // console.log(roaster);


        message.reply(`Would you like to join Secret Santa for ${currYear}?`);

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
                            console.log("Before Adding data", JSON.stringify(roaster, null, 4));
                            

                            
                            console.log(`${key} is not in the system`);                            
                            
                            //Creating the new user int the json file
                            const newUser = {
                                "id" : [message.author.id],
                                "joined" : d.toDateString(),
                            }

                            //Add new User to the JSON File
                            roaster[key] = newUser;
                            
                            //Add user to JSON file
                            const jsonString = JSON.stringify(roaster);
                            fs.writeFileSync(filePath, jsonString, 'utf-8', (err) => {
                                if(err) throw err;
                                response.reply(`Congrats ${message.author.displayName}! You've been added into the secret santa roaster for ${currYear}!`);
                            });
                            
                            response.reply(`Congrats ${key}! You've offically been registered for Secret Santa of ${currYear}!`);

                            //Updates and tracks how the file looks (prints out the json file)
                            const update_data = fs.readFileSync(filePath);
                            const updated_jsonData = JSON.parse(update_data);
                            console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
                        }
                    } catch (e) {
                        console.error("Error reading file: ", e);
                    }
                } else {
                    message.reply("Current roaster has not been started, please wait for an admin to start it dafuq.");
                }
            } else if(response.content === "!no") {
                response.reply("No problem, have a great day without santa, thanks for wasting my time.");
            }
        })

        //What the bot does if the person doesn't respond
        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    }
}