    const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
    const lang = require(`../../languages/${langSet}.json`);
    const args = msg.content.split(' ').slice(1);

    if (args.length < 1) return msg.channel.send(lang.eightball_noinput);
    const eightballAnswers = [];
    for (const x in lang) {
      if (x.includes('eightball_answer')) {
        eightballAnswers.push(lang[x]);
      }
    }
    const eightballAnswersIndex = Math.floor(Math.random() * eightballAnswers.length);

    const embed = new Discord.MessageEmbed()
      .addField(lang.eightball_question, args.join(' '))
      .addField(lang.eightball_embedfield, eightballAnswers[eightballAnswersIndex])
      .setColor('#ff6666')
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL());

    return msg.channel.send({ embed });
  }
