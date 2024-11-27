// at the top of your file
const { EmbedBuilder } = require('discord.js');
const date = new Date();

let currYear = date.getFullYear();

//Assets
const cryingCatPic = 'https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg';
const sadCatPic = 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900'; 
const youtubeLink = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

module.exports = {
    AssignedEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Success!', value: `People have been paired up with a random person`},
			)
			.setTimestamp()
		return embed
	},
    AlreadyAssignedEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'People have already been assigned', value: `To reassign type !yes or anything to not reassign`},
			)
			.setTimestamp()
		return embed
	},
    DontAssignedEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Sounds good boss', value: `No one was paired`},
			)
			.setTimestamp()
		return embed
	},
    ReAssignedEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Success Again!', value: `People have been re-paired`},
			)
			.setTimestamp()
		return embed
	},
    LeftOutEmbed(user) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Whoops', value: `${user} was left without a partner because there weren't enough people`},
			)
			.setTimestamp()
		return embed
	},
}