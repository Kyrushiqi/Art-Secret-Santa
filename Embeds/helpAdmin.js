// at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
module.exports = {
    HelpAdminEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL('https://www.youtube.com/watch?v=xvFZjo5PgG0')
			.setAuthor({ name: 'Help Bot', iconURL: 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
			.setDescription('I\'ve Been Summoned')
			.setThumbnail('https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg')
			.addFields(
				{ name: '😇 User Commands', value: '\u200b'},
				{ name: '!help', value: `Lists out available commands`},
				{ name: '!joinss', value: `Join this years Secret Santa!`},
				{ name: '!leaves', value: `Leave this years Secret Santa :(`},
				{ name: '!upload', value: `Upload an image!`},
				{ name: '!images', value: `Lists the images you've uploaded`},

				{ name: '\u200b', value: '\u200b'},

				{ name: '😎 Admin Commands', value: '\u200b'},
				{ name: '!startss', value: `Starts this years Secret Santa`},
				{ name: '!randomize', value: `Assigns people a Secret Person`},
				{ name: '!display', value: `Displays who has joined this years Secret Santa or pairings`},
			)
			.setTimestamp()
		return embed
	}
};