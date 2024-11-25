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

//Date
const d = new Date();
currYear = d.getFullYear();

//Paths
let currPath = __dirname;
let pathToSanta = path.join(currPath, '..', '/SantaFiles');
let pathToImages = path.join(pathToSanta, `/${currYear}`, `/Images`);


module.exports = {
    UploadImage, IsImageActive
}

async function UploadImage(message) {
    //Setting up response replys
    const filter = response => {
        return response.author.id == message.author.id;
    };
    //Setting up response stuff
    const collector = message.channel.createMessageCollector({filter, max : 1, time : 15000 });

    collector.on('collect', async response => {
        if(response.attachments.size > 0) {
            const image = response.attachments.first();


            if(image.contentType && image.contentType.startsWith('image/')) {
                await SaveImage(image.url, response); 
                response.reply(`Image received`);
            } else {
                response.reply('That is not an image. Please upload a valid image.');
            }
        } else {
            response.reply('No image detected. Please try again');
        }
        collector.on('end', collected => {
            if(collected.size === 0) {
                message.channel.send(`Thanks for wasting my time ${message.author}`);
            }
        })
    });
}


async function SaveImage(image, response) {
    try {
        const res = await fetch(image); //Get image
        const arrayBuff = await res.arrayBuffer(); // Get image as Array Buffer
        const buff = Buffer.from(arrayBuff); //Convert the ArrayBuffer

        const imageActive = await IsImageActive();

        if(imageActive == 1) {
            console.log('Secret Santa hasnt started yet');
            return;
        }
        if(imageActive == 2) {
            console.log(`Couldn't find image folder so we created one`);
            fs.mkdirSync(pathToImages, {recursive : true});
        }


        //Setting up the file path to save the image
        const userFilepath = path.join(pathToImages, `/${response.author.displayName}`);

        if(!fs.existsSync(userFilepath)) {
            fs.mkdirSync(userFilepath, {recursive : true});
        }

        //Getting the amount of files uploaded before
        const count = await GetImageCount(path.join(pathToImages, `/${response.author.displayName}`))

        const imagePath = path.join(userFilepath,`/${response.author.displayName}_${count}.jpeg`);

        //Save file to path
        fs.writeFileSync(imagePath, buff);
        // console.log(`Saved image to ${userFilepath}`);

    } catch (e) {
        console.error(e);
    }
}

async function IsImageActive() {
    if(!fs.existsSync(path.join(pathToSanta, `/${currYear}`)))
        return 1;

    let pathToRoster = path.join(pathToSanta, `/${currYear}`)

    if(!fs.existsSync(path.join(pathToRoster, `/Images`)))
        return 2;

    return 0;
}

async function GetImageCount(path) {
    try {
        const files = await fs.readdirSync(path)
        const fileCount = files.length;
        return fileCount;
    } catch (e) {
        console.error(e);
    }
}