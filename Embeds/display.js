const { EmbedBuilder } = require('discord.js');

//Date
const d = new Date();
currYear = d.getFullYear();


const cryingCatPic = 'https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg';
const sadCatPic = 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900'; 
const youtubeLink = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

// inside a command, event listener, etc.
module.exports = {
    DisplayRosterEmbed(users) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A welcomed team')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Help Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('I\'ve Been Summoned')
			.setThumbnail(cryingCatPic)
			.setTimestamp()

		let count = 1;
		users.forEach(user => {
			embed.addFields({name: '\u200b', value: `${count}. ${user}`});
			count++;
		});
		return embed
	},
	DisplayAssignmentsEmbed(users) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A welcomed team')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Help Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('I\'ve Been Summoned')
			.setThumbnail(cryingCatPic)
			.setTimestamp()

		let count = 1;
		for(const [key, value] of Object.entries(users)) {
			embed.addFields(
				{name: '\u200b', value: `${count}. ${key} -> ${value}`}
			)
			count++;
		}
		return embed
	},
	DisplayImagesEmbed(images, user) {
		try {
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('A welcomed team')
				.setURL(youtubeLink)
				.setAuthor({ name: 'Help Bot', iconURL: sadCatPic, url: youtubeLink })
				.setDescription("I've Been Summoned")
				.setThumbnail(cryingCatPic)
				.setTimestamp()

			for(const key of Object.keys(images)) {
				const item = images[key]
				embed.addFields(
					{
						name: key,
						value: `[${item.name}](${item.url})`,
						inline: true,
					}
				)
			}
			
			return embed
		} catch (error) {
			console.error('Error in DisplayImagesEmbed:', error);
			return e;
		}
	}
};