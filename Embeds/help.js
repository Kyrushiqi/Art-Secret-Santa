// at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
module.exports = {
    HelpEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL('https://www.youtube.com/watch?v=xvFZjo5PgG0')
			.setAuthor({ name: 'Help Bot', iconURL: 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
			.setDescription('I\'ve Been Summoned')
			.setThumbnail('https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg')
			.addFields(
				{ name: '!help', value: `Lists out available commands`},
				{ name: '!placeholder', value: `Placeholder`},
				{ name: '!placeholder', value: `Placeholder`},
				{ name: '!placeholder', value: `Placeholder`},
				{ name: '!placeholder', value: `Placeholder`},
			)
			.setTimestamp()
		return embed
	}
};