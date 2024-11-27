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
    WaitForRosterEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Secret Santa hasn\'t started yet', value: `Please wait for an admin to start the secret santa!`},
			)
			.setTimestamp()
		return embed
	},
	WaitForMapEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Whoopsie', value: `People have not been assigned pairs yet.`},
			)
			.setTimestamp()
		return embed
	},
	WaitForImagesEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Whoopsie', value: `Images have not been uploaded yet`},
			)
			.setTimestamp()
		return embed
	},
};