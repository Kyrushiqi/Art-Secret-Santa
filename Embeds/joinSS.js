// at the top of your file
const { EmbedBuilder } = require('discord.js');
const date = new Date();

let currYear = date.getFullYear;

//Assets
const cryingCatPic = 'https://www.shutterstock.com/shutterstock/photos/2415076223/display_1500/stock-vector-computer-cat-animal-meme-pixel-art-2415076223.jpg';
const sadCatPic = 'https://pbs.twimg.com/media/EAmr-PAWsAEoiWR?format=jpg&name=900x900'; 
const youtubeLink = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

// inside a command, event listener, etc.
module.exports = {
    JoinSSEmbed() {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('A Helping Hand')
			.setURL(youtubeLink)
			.setAuthor({ name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink })
			.setDescription('HO HO HOE')
			.setThumbnail(cryingCatPic)
			.addFields(
				{ name: 'Thanks for chosing Karina\'s Secrete Santa Bot', value: `Please follow the steps below to move forward.`},
				{ name: `To Join for ${currYear}`, value: `Please type "!yes"`},
				{ name: 'To Reject', value: `Please type "!no"`},
			)
			.setTimestamp()
		return embed
	},

    JoinYesEmbed_Added() {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('CONGRATS')
            .setURL(youtubeLink)
            .setAuthor({name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink})
            .setThumbnail(cryingCatPic)
            .addFields({name: 'Congrats', value: 'You\'ve been accepted into the program! Have fun drawing and best of luck winning!'})
            .setTimestamp();
    },

    JoinYesEmbed_AlreadyExists() {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Woah buddy')
            .setURL(youtubeLink)
            .setAuthor({name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink})
            .setThumbnail(cryingCatPic)
            .addFields({name: 'You\'re doing great!', value: 'It seems like you\'re already in the systen!, Best of luck!'})
            .setTimestamp();
    },

    //Need to finish this
    JoinNoEmbed() {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Woah buddy')
            .setURL(youtubeLink)
            .setAuthor({name: 'Secret Santa Bot', iconURL: sadCatPic, url: youtubeLink})
            .setThumbnail(cryingCatPic)
            .addFields({name: 'You\'re doing great!', value: 'It seems like you\'re already in the systen!, Best of luck!'})
            .setTimestamp();
    }
};