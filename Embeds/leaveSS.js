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
    LeaveSSEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'DAFUQ', value: `So you wanna leave huh`},
				{ name: 'To leave', value: `type !yes`},
				{ name: 'To Stay', value: `type !no`},
			)
			.setTimestamp()
		return embed
	},
    LeaveSSYesEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `Great to see you go`, value: `You've offically left the roster for ${currYear}`}
			)
			.setTimestamp()
		return embed
    },
    LeaveSSNOEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `LETS GOOO`, value: `We're glad you stayed`},
			)
			.setTimestamp()
		return embed
    },
    LeaveSSExistsEmbed() {
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: `Woah Woah Woah`, value: `Looks like you're not in the system, all good to go`},
			)
			.setTimestamp()
		return embed
    }
};