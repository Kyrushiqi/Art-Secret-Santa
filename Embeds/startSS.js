// at the top of your file
const { EmbedBuilder } = require('discord.js');
const date = new Date();

let currYear = date.getFullYear();

//Assets
const cryingCatPic = 'https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg';
const sadCatPic = 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900'; 
const youtubeLink = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

// inside a command, event listener, etc.
module.exports = {
    StartSSEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'LETS GOOOO NEW YEARR NEW SANTA', value: `Please follow the steps below to move forward.`},
				{ name: `To start roaster for ${currYear}`, value: `Please type "!yes"`},
				{ name: 'To reject', value: `Please type "!no"`},
			)
			.setTimestamp()
		return embed
	},
    StartSSRoasterStartedEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `SUCCESS`, value: `THE NEW ROASTER FOR ${currYear} HAS BEGUN`}
			)
			.setTimestamp()
		return embed
    },
    StartSSNoEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `No Problem`, value: `The roaster was not created`},
			)
			.setTimestamp()
		return embed
    },
    StartSSErrorEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `Oops`, value: `Seems like the folder was already there so we just added the roaster`},
				{ name: `SUCCESS`, value: `THE NEW ROASTER FOR ${currYear} HAS BEGUN`},
			)
			.setTimestamp()
		return embed
    },
};