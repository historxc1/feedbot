const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {

  console.log(`Ready!`); 

  
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(``);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(``);
});



client.on("message", async message => {

  if(message.author.bot) return;
   
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
 
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "help") {
    const embed = {
      "title": "Help Menu",
      "description": `**__Fun Comamnds__**
      **?no** | A fun little command for everyone
      **?ok** | A fun little command for everyone
      **?bruh** | A fun little command for everyone
      
      **__Useful Commands__**
      **?serverinfo** | Gives some information about the server
      **?members [rolename]** | Let's you see what members have that role
      **?ping** | Show's the bot's ping
      
      *Admin commands are not listed here.*`, 
      "color": 7963144,
      "timestamp": "2020-02-19T19:39:41.214Z"
    };
    message.channel.send({ embed });
  }


  if(command === "no") {
    message.delete().catch(O_o=>{}); 
    const m = await message.channel.send("https://tenor.com/8pOE.gif ");
  }
  if(command === "ok") {
    message.delete().catch(O_o=>{});
    const m = await message.channel.send("https://tenor.com/bdkoy.gif ");
  }

  if(command === "bruh"){
      message.delete().catch(O_o=>{});
      const m = await message.channel.send("https://tenor.com/vNt7.gif");
  }
  if(command === "roll"){
    message.channel.send(`:game_die: **${message.author.username}**, you rolled a **${Math.floor(Math.random() * 6) + 1}**!`);
  }
 

  if(command === "bug") {
    if (!args[0]) return message.reply("Please specify the bug. Example:\n`/punch isn't working. It isn't mentioning the user I'm trying to punch`");
    if (args[0] === "bug") return message.reply("Please specify the bug. Example:\n/punch isn't working. It isn't mentioning the user I'm trying to punch");
  
    const bug = args.join(" ");
    message.channel.send("Thanks for submitting a bug!");
    
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${bug}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.get('936723936660574259').send(content)
  }

  if(command === "suggest") {
    if (!args[0]) return message.reply("Please specify the suggestion.");
    if (args[0] === "bug") return message.reply("Please specify the suggestion.");
  
    const bug = args.join(" ");
    message.channel.send("Thanks for submitting a suggestion!");
    
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) suggested:\n~~--------------------------------~~\n${bug}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.get('936728285507883049').send(content)
  }
  


  if(command === "serverinfo") {
    const embed = {
      "title": "Server Information",
      "description": `${client.users.size} users
      ${client.channels.size} channels
      ${client.emojis.size} emojis`,
      "color": 7963144,
      "timestamp": "2020-02-19T19:39:41.214Z"
    };
    message.channel.send({ embed });
  }


  if(command === "members"){
    let roleName = message.content.split(" ").slice(1).join(" ");
    let membersWithRole = message.guild.members.filter(member => { 
      return member.roles.find("name", roleName);
    }).map(member => {
      return member.user.username;
    })
    if(!roleName)
    return message.send("Please use a valid role.");

    const embed = {
      author: {
        name: `Members in ${roleName}`,
        icon_url: `${message.author.displayAvatarURL}`
      },
      "description": `${membersWithRole.join(`
      `)}`,
      "color": 7963144,
      "timestamp": new Date(),
    };
    message.channel.send({ embed });
  } 


  if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                MODERATION                                                                //
//                                                 COMMANDS                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if(command === "announce"){
    let AnnouncementAuthor = message.author.username
    let amessage = message.content.split(" ").slice(1).join(" ");

    if(!message.member.hasPermission("ADMINISTRATOR") && 
    !message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have permission to use this command.`);

      const embed = {
        author: {
          name: `${AnnouncementAuthor}`,
          icon_url: `${message.author.displayAvatarURL}`
        },
        "title": "Announcement",
        "description": `${amessage}`,
        "color": 7963144,
        "timestamp": new Date(),

      };
      message.channel.send({ embed });
    }

  if(command === "kick") {
    
    if(!message.member.hasPermission("ADMINISTRATOR") && 
    !message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have permission to use this command.`);

 
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
       return message.reply("Please mention a valid member of this server.");
      if(!member.kickable) 
       return message.reply("I cannot kick this user!");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
    
     await member.kick(reason)
    
       .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  
     const embed = {
      author: {
        name: `Kicked.`,
        icon_url: `${message.author.displayAvatarURL}`
      },
      "description": `${member.user} has been kicked by ${message.author}.
      Reason: "${reason}"`,
      "color": 7963144,
      "timestamp": new Date(),

    };
    message.channel.send({ embed });

  }
  if(command === "ban") {
    
    if(!message.member.hasPermission("ADMINISTRATOR") && 
    !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permission to use this command.`);

 
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
       return message.reply("Please mention a valid member of this server.");
      if(!member.bannable) 
       return message.reply("I cannot ban this user!");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
    
     await member.ban(reason)
    
       .catch(error => message.reply(`The action could not be completed. ${error}`));
  
     const embed = {
      author: {
        name: `Banned.`,
        icon_url: `${message.author.displayAvatarURL}`
      },
      "description": `${member.user} has been banned by ${message.author}.
      Reason: "${reason}"`,
      "color": 7963144,
      "timestamp": new Date(),

    };
    message.channel.send({ embed });

  }
  if(command === "mute"){

    if(!message.member.hasPermission("ADMINISTRATOR") && 
    !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permission to use this command.`);

    let userVar = message.author
    let member = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!member) return message.channel.send("**?mute** is used to mute a user.")

    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send("Please provide a reason")

    if(member.roles.has("936711426398117918")) {
        return message.channel.send(`${member.displayName} is already muted!`)
    } else {
        await member.addRole("936711426398117918").catch(e => console.log(e.message))

        const embed = {
          author: {
            name: `Muted.`,
            icon_url: `${message.author.displayAvatarURL}`
          },
          "description": `${member.user} has been muted by ${message.author}.
          Reason: "${reason}"`,
          "color": 7963144,
          "timestamp": new Date(),
        };
        message.channel.send({ embed });
    }
  
 
  }
  if(command === "unmute"){

    if(!message.member.hasPermission("ADMINISTRATOR") && 
    !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permission to use this command.`);

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("**?unmute** is used to unmute a user.")

    if(!rMember.roles.has("936711426398117918")) {
        return message.channel.send(`**${rMember.displayName}** is not muted!`)
    } else {
        await rMember.removeRole("679070465465253922").catch(e => console.log(e.message))
          
        const embed = {
          author: {
            name: `Unmuted.`,
            icon_url: `${message.author.displayAvatarURL}`
          },
          "description": `${member.user} has been unmuted by ${message.author}.`,
          "color": 7963144,
          "timestamp": new Date(),
        };
        message.channel.send({ embed });
      }
   } //Later, figure out how to send a small embed in the current channel with "*Wave* Bye bye!" And then a larger log embed in a logs channel.
  
  if(command === "purge") {
   
    if(!message.member.roles.some(r=>["Admin", "Discord Dev"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`The action could not be completed. ${error}`));
      const embed = {
     
        "description": `Messages deleted. 🗑️`,
        "color": 7963144,
  
      };
      message.channel.send({ embed });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Secret Developer                                                             //
//                                                 COMMANDS                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(command === "say") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You don't have permission to use this command.`);
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

});
client.login(config.token);
