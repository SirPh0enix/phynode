const Discord = require('discord.js');
exports.run = (client, messageReaction, user) => {
	const tableload = client.guildconfs.get(messageReaction.message.guild.id);

	if (!tableload.starboard) {
		tableload.starboard === 'false';
		tableload.starboardchannel === '';
		client.guildconfs.set(messageReaction.message.guild.id, tableload);
	}
	if (tableload.starboard === 'false') return;

	if (messageReaction.emoji.name === '⭐') {
		if (messageReaction.count > 1) {
			const table = client.starboard.get(messageReaction.message.id);
			const starboardch = client.channels.get(table.channel);

			const embed = new Discord.RichEmbed()
			.setColor('#a6a4a8')
			.setTimestamp()
			.setFooter(`⭐${messageReaction.count - 1}`)
			.setDescription(`**Message:** \n ${messageReaction.message.content}`)
			.setAuthor(`${messageReaction.message.author.tag} (${messageReaction.message.author.id})`, messageReaction.message.author.displayAvatarURL);

		starboardch.fetchMessage(table.msgid).then(m => m.edit({ embed }));
	}

	if (client.starboard.get(messageReaction.message.id)) {
		const table = client.starboard.get(messageReaction.message.id);
		const starboardch = client.channels.get(table.channel);

		starboardch.fetchMessage(table.msgid).then(m => m.delete());
	}

	}
};