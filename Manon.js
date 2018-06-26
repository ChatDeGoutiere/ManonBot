const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs-extra")
const weather = require('weather-js');

var prefix = "m!"

client.login(process.env.TOKEN);


client.on('ready', function() {
    client.user.setActivity(`m!help | ${client.guilds.size} serveur | ${client.users.size} joueur `, {type: "STREAMING"});
    console.log(`====================`);
    console.log(`=====|=======|======`);
    console.log(`====================`);
    console.log(`===|============|===`);
    console.log(`====||||||||||||====`);
    console.log(`====================`);
});

client.on("message", message => {

    if(message.author.bot) return;
    if (message.content.startsWith(prefix + "say")){
        message.delete(1);
        var embed = new Discord.RichEmbed()
            .setColor("#FF0105")
            .setDescription(message.content.substr(prefix.length + 4))
        message.channel.send(embed)
    }

    if (message.content === prefix + "invite"){
        var embed_invite = new Discord.RichEmbed()
            .setTitle("Les lien d'invitation")
            .setColor("#FF0105")
            .setDescription("voici le lien de Manon")
            .addField("le lien de Manon:", "[=>Manon<=](https://discordapp.com/oauth2/authorize?client_id=460436697889374238&scope=bot&permissions=2146827519)")
            .setFooter(`Manon | demendée par ${message.author.username}`)
        message.channel.send("==>Message privée<==")
        message.author.send(embed_invite)

    }

    if (message.content === prefix + "userinfo") {
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var stats_embed = new Discord.RichEmbed()
            .setColor("#FF0105")
            .setTitle(`Statistiques de l'utilisateur ${message.author.username}`)
            .addField(`Tag de l'utilisateur`, message.author.tag)
            .addField(`:id:ID de l'utilisateur`, message.author.id)
            .addField(`Date de creation de l'utilisateur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
        message.channel.send(stats_embed)
    }

    if(message.content.startsWith(prefix + "report")){
        message.delete();
        var reason1 = message.content.split(" ").slice(2).join(" ");
        if(!reason1){
            return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:")
        };
        var util = message.mentions.users.first();             
              var mention = message.mentions.users.first();
        if(!message.guild.channels.find("name", "report")) return message.reply(":x: **Vous devez créer le salon `report` et y mettre la permission pour que Manon puisse y écrire dedans !** :x:");
        var report_embed = new Discord.RichEmbed()
        .setColor("#E622BF")
        .setTitle("Report")
        .addField("__Par : __", message.author.username)
        .addField("__**Pour : **__ ", message.mentions.users.first(), true)
        .addField("**Raison du report : **", reason1, true)
        .setFooter(`Manon | report`)
        message.guild.channels.find('name', 'report').send(report_embed).catch();
        message.channel.send("__**Report envoyé avec succès !**__").then(function (message) { message.react("✅") })
    };

    if(message.content.startsWith(prefix + 'warn')){
        message.delete();
         var botrole = message.guild.member(client.user).hasPermission("KICK_MEMBERS");
      var memberrole = message.guild.member(message.author).hasPermission("KICK_MEMBERS");
      var reportmember = message.member.id;
      if(!message.mentions.users.first())
      return message.channel.send(":tools: **Comment utiliser ma commande =>** ```%warn <@utilisateur> <raison>``` **Permission requise ->** ```KICK_MEMBERS```")
      var member = message.mentions.users.first();
      var reason = message.content.split(" ").slice(2).join(" ");
      if(!botrole){
          return message.channel.send(":x: **Je n'ai pas la permission ``KICK_MEMBERS`` pour avertir cet utilisateur !:x: **")
        };
          if(!memberrole){
              return message.channel.send(":x: **Tu n'as pas la permission ``KICK_MEMBERS`` pour avertir cet utilisateur !** :x:")
          };
          if(!reason){
              return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:").catch()
          };
      if(memberrole){
          if(botrole){
            if(message.guild.member(message.mentions.users.first())){
                  eval(message.guild.member(message.mentions.users.first()))
                  message.guild.member(message.mentions.users.first()).send("Tu as été averti sur le serveur " +  message.guild.name + " par le modérateur <@" + message.author.id+"> pour la raison : \n " + reason )
                
                  
                  var warn_embed = new Discord.RichEmbed()
                  .setColor("#B40404")
                  .addField("**Avetissement du joueur **", message.mentions.users.first(), true)
                  .addField("**Avertissement exécuté Par **", message.author.tag, true)
                  .addField("**Raison de l'avertissement : **", reason, true)
                  .setFooter("RustyBot | warn")
                  message.channel.send(warn_embed).then(function (message) { message.react("💢") })}
                }
              }
        }

        if(message.content.startsWith(prefix + 'kick')){
            message.delete();
          if (message.channel.type === "dm") return;
          if(!message.mentions.users.first()){
            return message.channel.send(":tools: **Comment utiliser ma commande =>** ```%kick <@utilisateur> <raison>```  **Permission requise ->** ```KICK_MEMBERS```");
          }
          if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission !** :x:").catch(console.error);
          if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("**:x: Je n'ai pas la permission pour exclure. :x:**").catch(console.error);
            
          }
          var reason = message.content.split(" ").slice(2).join(" ");
          if(!reason){
               return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:")
           };
          var member = message.mentions.users.first();             
          message.guild.members.get(member.id).kick(); {
            var mentionned = message.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = message.author;
            }
            message.client.users.get(getvalueof.id).send("**Tu as été exclu du serveur **" +  message.guild.name + "** Pour la raison** " + reason)
    
            var kick_embed = new Discord.RichEmbed()
            .setColor("#B40404")
            .addField("**Exclusion du joueur **", message.mentions.users.first(), true)
            .addField("**Exclusion exécutée Par **", message.author.tag, true)
            .addField("**Raison de l'exclusion : **", reason, true)
            .setFooter("ᴄᴀᴛʙᴏᴛ | Exclusion d'un membre du serveur " + message.guild.name + ".")
            message.channel.send(kick_embed).then(function (message) { message.react("❌") })
        }};

        if(message.content.startsWith(prefix + 'ban')){
            message.delete();
            if (message.channel.type === "dm") return;
                    if(!message.mentions.users.first()){
              return message.channel.send(":tools: **Comment utiliser ma commande ->** ```%ban <@utilisateur> <raison>```  **Permission requise ->** ```BAN_MEMBERS```");
            }
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission !** :x:").catch(console.error);
            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.reply("**:x: Je n'ai pas la permission pour bannir. :x:**").catch(console.error);
              
            }
            var reason = message.content.split(" ").slice(2).join(" ");
            if(!reason){
                 return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:")
             };
            var member = message.mentions.users.first();             
            message.guild.members.get(member.id).ban(); {
              var mentionned = message.mentions.users.first();
              var getvalueof;
              if(mentionned){
                  var getvalueof = mentionned;
              } else {
                  var getvalueof = message.author;
              }
            message.client.users.get(getvalueof.id).send("**Tu as été Banni du serveur **" +  message.guild.name + "** Pour la raison** " + reason)
            var ban_embed = new Discord.RichEmbed()
            .setColor("#B40404")
            .addField("**Bannissement du joueur **", message.mentions.users.first(), true)
            .addField("**Bannissement exécuté Par **", message.author.tag, true)
            .addField("**Raison du bannissement : **", reason, true)
            .setImage("https://cdn.discordapp.com/attachments/424936338031116308/454634287484895232/BAN.gif")
            .setFooter("RustyBot | ban")
            message.channel.send(ban_embed).then(function (message) { message.react("🚫") })
        }};

        if (message.content.startsWith(prefix + "addrole")) {
            if (message.channel.type === "dm") return;
            if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
            if(message.mentions.users.size === 0) {
              return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
            }
            let addmember = message.guild.member(message.mentions.users.first());
            if(!addmember) {
              return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");

                  }else{
            let args = message.content.split(" ").slice(1);
                                  var amount = message.content.slice(message.content.indexOf(message.content.split(" ")[2]))
            let userRoleID = message.guild.roles.find("name", `${amount}`);
            if(!message.guild.roles.exists("name", `${amount}`)) {
                    message.channel.send(":x: Le role **"+amount+"** n'a pas été trouvé");
                  }else{
            
                        addmember.addRole(userRoleID).catch(error => console.log(error));
              message.channel.send(`**${addmember}** à désormais le role **${amount} :smile:**`)
        }}};

        if (message.content.startsWith(prefix + "unmute")) {
            if (message.channel.type === "dm") return;
            if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
            if(message.mentions.users.size === 0) {
              return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
            }
            let muteMember = message.guild.member(message.mentions.users.first());
            if(!muteMember) {
              return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
            }
            if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
              return message.reply("*:x: Je n'ai pas la permission pour unmute...**").catch(console.error);
            }
            message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: true }).then(member => {
                message.channel.send(`**${muteMember.user.username}** est désormais unmute dans **#${message.channel.name}** :mute:`)
        })};

        if (message.content.startsWith(prefix + "eval")) {
            const config = require('./config.json');
            if(config.maintainers.indexOf(message.author.id)> -1 ) {
                var util = require("util");
                let args = message.content.split(" ").slice(1); 	
                let code = args.join(' ');
					try {
			  let ev = eval(code)
							let str = util.inspect(ev, {
								depth: 1
							})
							if(str.length > 1800) {
								str = str.substr(0, 1800)
								str = str + "..."
							}
							message.delete();	
			message.react("✅");
					message.channel.send("", { embed: {	
						color: 16758725,			
				fields: [{				
					name: ':inbox_tray: **Input**',			
						value: '\`\`\`' + code + '\`\`\`'					
			},{			
						name: ':outbox_tray: **Output**',	
								value: '\`\`\`' + str + '\`\`\`'	
							}],	
						footer: {			
					text: `request by @${message.author.username}`		}			}});}	catch (err) {		message.react("❌");
			message.channel.send("", { embed: {	
						color: 16758725,			
				fields: [{				
					name: ':inbox_tray: **Input**',			
						value: '\`\`\`' + code + '\`\`\`'					
			},{			
						name: ':outbox_tray: **Output**',	
								value: '\`\`\`' + err + '\`\`\`'	
							}],	
						footer: {			
                    text: `request by @${message.author.username}`		}			}});		}	}else{
                        return message.reply("Tu n'est pas **l'Owner**")
                    }
        }

        if (message.content.startsWith(prefix + "cookie")) {
            var cookieImga = [
                'https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif',
                'http://i.giphy.com/E77F8BfvntOq4.gif',
                'https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986',
                'http://i.imgur.com/bYVl2.gif',
                `https://media.giphy.com/media/nAErqE3k2C3fy/giphy.gif`,
                `https://media.giphy.com/media/mwD0VOVS7tQli/giphy.gif`,
                `https://media.giphy.com/media/p8fgbnLzWWtEI/giphy.gif`,
                `https://media.giphy.com/media/26xBvXNKIykYtxIcw/giphy.gif`,
                `https://media.giphy.com/media/26FeXTOe2R9kfpObC/giphy.gif`,
                `https://media.giphy.com/media/26gs8nKrs7uduirss/giphy.gif`,
                `https://media.giphy.com/media/S3HBZs20Up1UQ/giphy.gif`,
                `https://media.giphy.com/media/6MRScaSvH5xq8/giphy.gif`,
                `https://media.giphy.com/media/3oEduKkw4KOurpkrza/giphy.gif`,
                `https://media.giphy.com/media/xT9KVrKucCn7SlSUx2/giphy.gif`,
                `https://media.giphy.com/media/l0MYAuUkuPPjrbDBS/giphy.gif`,
                `https://media.giphy.com/media/pN6Jvdh6BwSEE/giphy.gif`
            ];
            var cookieImg = cookieImga[Math.floor(Math.random() * cookieImga.length)];
            if (message.mentions.members.first()) {
                message.channel.send(new Discord.RichEmbed()
                    .setTitle(message.member.user.username + ' A donner un Cookie à  ' + message.mentions.members.first().user.username)
                    .setColor(2123412)
                    .setImage(cookieImg));
    }
    else {
        message.channel.send(new Discord.RichEmbed()
            .setColor([255, 0, 0])
            .setDescription("❌Erreur Exemple m!cookie @user"));
    }};

    if (message.content.startsWith(prefix + "pat")) {
        var images = [
            'https://pa1.narvii.com/6490/e9649d41af555774b0bd62ed43c050dc036ed6c9_hq.gif',
            'http://i0.kym-cdn.com/photos/images/original/001/142/787/396.gif',
            'https://media.giphy.com/media/SvQ7tWn8zeY2k/source.gif',
            'https://78.media.tumblr.com/18e1fdcde34edf0cf03c588162fbd0ea/tumblr_npeccq4y3H1rzk6edo1_500.gif',
            'https://pa1.narvii.com/6353/60e5d2c9721de7f3f3b1946acfa3acc2f3d43b9e_hq.gif',
            'http://i.imgur.com/laEy6LU.gif',
            'https://funnypictures1.fjcdn.com/funny_gifs/Head_389b42_6102763.gif',
            'https://memestatic4.fjcdn.com/thumbnails/comments/She+deserves+all+the+head+pats+_952b94cc7a9bfd9107e28ece64b158de.gif',
            `https://media.giphy.com/media/nfKdTuhshHG7K/giphy.gif`,
            `https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif`,
            `https://media.giphy.com/media/4AbQzx94Kz3Ne/giphy.gif`,
            `https://media.giphy.com/media/3oFzmm13V0h44D61bi/giphy.gif`,
            `https://giphy.com/gifs/animation-art-fun-xUA7bahIfcCqC7S4qA `
        ];
        var patImg = images[Math.floor(Math.random() * images.length)];
        if (message.mentions.members.first()) {
            message.channel.send(new Discord.RichEmbed()
                .setTitle(message.member.user.username + ' A donner une caresse à ' + message.mentions.members.first().user.username)
                .setColor(3447003)
                .setImage(patImg));
        } else {
                message.channel.send(new Discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setDescription("❌Erreur Exemple +pat @user"));
    }}

    var fs = require('fs-extra');
    
    let autorole = JSON.parse(fs.readFileSync("./data/autoRole.json", "utf8"));
    var autoRole;
    if (autorole[message.guild.id]) {
        var autoRole = autorole[message.guild.id].autoRole;
    }
    if (message.content.startsWith(prefix + "setautorole")) {
        if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas les permissions dans ce serveur**").catch(console.error);
        } else {
            let args = message.content.split(' ').slice(1);
            if (!args) return message.channel.send('**:x: Merci de specifier un rôle**')
            autorole[message.guild.id] = { "autoRole": args.join(" ") };
            message.channel.send("Mon autoRole est `" + args.join(" ") + "`");
            fs.writeFile("./data/autoRole.json", JSON.stringify(autorole), (err) => { if (err) console.error(err); });
        }
    }

    if (message.content.startsWith(prefix + "delautorole")) {
        if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas les permissions dans ce serveur**").catch(console.error);
        }
        if (autorole[message.guild.id]) {
            delete autorole[message.guild.id];
            if (message.member.nickname === null) {
                message.channel.send("Mon autorole a été supprimé");
            } else {
                message.channel.send("Mon autorole a été supprimé");
            }
            fs.writeFile("./data/autoRole.json", JSON.stringify(autorole), (err) => { if (err) console.error(err); });
        } else {
            message.channel.send("Erreur ! Mon autoRole est `" + autorole + "`");
        }
    }

    let afk = JSON.parse(fs.readFileSync("./data/afks.json", "utf8"));
if (message.content.startsWith(prefix + "delafk")){
if (afk[message.author.id]) {
delete afk[message.author.id];
if (message.member.nickname === null) {
    const embed = new Discord.RichEmbed()
    .setColor(1752220)
    .setDescription("AFK Enlever")
    message.channel.send(embed);
}else{
    const embed = new Discord.RichEmbed()
    .setColor(1752220)
    .setDescription("AFK Enlever")
    message.channel.send(embed);
}
fs.writeFile("./data/afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}else{
    const embed = new Discord.RichEmbed()
    .setColor(1752220)
   .setDescription("Erreur ! Tu es n'est pas afk")
    message.channel.send(embed);
}
}


if (message.content.startsWith(prefix + "afk")){
if (afk[message.author.id]) {
    const embed = new Discord.RichEmbed()
    .setColor(1752220)
    .setDescription("Tu est afk")
    message.channel.send(embed);
  }else{
  let args1 = message.content.split(" ").slice(1);
  if (args1.length === 0) {
 afk[message.author.id] = {"reason" : true};
 message.delete();
const embed = new Discord.RichEmbed()
.setColor(1752220)
.setDescription(`Tu est désormais afk | tape ${prefix}*delafk* pour enlver ton afk`)
message.channel.send(embed);
}else{
afk[message.author.id] = {"reason" : args1.join(" ")};
message.delete();
const embed = new Discord.RichEmbed()
.setColor(1752220)
.setDescription(`Tu est désormais afk tape ${prefix}*delafk* pour enlver ton afk`)
message.channel.send(embed);
}
fs.writeFile("./data/afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}
}
    
    var mentionned = message.mentions.users.first();
    let user = message.mentions.users.first();
if(message.mentions.users.size > 0) {
if (afk[message.mentions.users.first().id]) {
if (afk[message.mentions.users.first().id].reason === true) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${mentionned.username} est AFK:`, user.avatarURL)
    .setColor(1752220)
    .setDescription(` **Il a pas mit pas de raison ce con 😹😹**`)
    .setTimestamp()
    .setFooter("©2018 " + client.user.username)
message.channel.send(embed);
}else{
    const embed = new Discord.RichEmbed()
    .setAuthor(`${mentionned.username} est AFK: `, user.avatarURL)
    .setColor(1752220)
    .setDescription(`${afk[message.mentions.users.first().id].reason}`)
    .setTimestamp()
    .setFooter("©2018 " + client.user.username)
    message.channel.send(embed);
}
}
}
});

client.on('guildCreate', (guild) => {
    const channel = bot.guilds.get('444260337190043658').channels.get(`460846617273303077`).send('**Oh un nouveau** '+guild.name+', **Proprietaire: **'+guild.owner.user.username+', **Nombre de membres: **'+guild.memberCount);
    guild.owner.send(`Salut, merci de m'avoir ajouté dans votre serveur **${guild.name}** voiçi le discord support : https://discord.gg/pJeEu7W`)
    
});

client.on('guildDelete', (guild) => {
    const channel = client.guilds.get('444260337190043658').channels.get(`460846617273303077`).send('**Non ne pars pas ** '+guild.name+', **Propriaitaire: **'+guild.owner.user.username+', **Nombre de membres: **'+guild.memberCount);
});


client.on("message", message => {
    if (message.content.startsWith(prefix + "role")) {
        var amount = message.content.split(" ").slice(1).join(" ");
        let role = message.guild.roles.find("name", `${amount}`)
        var erreur = new Discord.RichEmbed()
                  .setColor(10038562)
                  .setDescription("❌Erreur Exemple /role role");
        if(!role) return message.channel.send(erreur);
                  var moment = require("moment");
                  moment.locale("fr");
                var temps = moment(message.createdTimestamp).format("LLLL");
        var test = new Discord.RichEmbed()
                              .setColor(10038562)
                              .addField('✏ Nom', role.name, true)
                              .addField('🆔 ID', role.id, true)
                              .addField('👥 Personne ayant le roles', role.members.size, true)
                              .addField('🔝 Position', role.position + 1, true)
                              .addField('💙 Couleur', role.hexColor, true)
                              .addField('📣Mentionable', role.mentionable, true)
                              .addField('📅 Crée le', moment(role.createdAt).format("LL"), true);
                message.channel.send(test)
    };

    if (message.content.startsWith(prefix + "serverinfo")) {
        if(!message.guild) return;
          message.channel.send({embed: {
              color: Math.floor(Math.random()*16777216),
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },
                fields :[{
                 name : '**🔠Nom du Serveur**',
                 value : message.guild.name,
                 inline : true
                 },{
                 name : '**👑Propriétaire**',
                 value : message.guild.owner.user.tag,
                 inline : true
                },{
                  name : '**🛡Niveau de Vérification**',
                  value : message.guild.verificationLevel,
                  inline : true
                },{
                 name : '**🌐Région**',
                 value : message.guild.region,
                 inline : true
                },{
                  name : '**👪Nombre de Membres**',
                  value : message.guild.memberCount,
                  inline : true
                },{
                  name : '**👨Humain **',
                  value : message.guild.members.filter(m => ! m.user.bot).size,
                  inline : true
                },{
                  name : '**🤖Bot**',
                  value : message.guild.members.filter(m => m.user.bot).size,
                  inline : true
                },{
                 name: "📂Channels textuels",
                 value: message.guild.channels.filter(channel => channel.type === 'text').size,
                 inline: true
                },{
                  name: "🔊Channels Vocaux",
                  value: message.guild.channels.filter(channel => channel.type === 'voice').size,
                  inline: true
                 },{
                   name: "🚻Nombres de rôles",
                   value: message.guild.roles.size,
                   inline: true
                 },{
                  name : '**Nombre d\'émojie**',
                  value : message.guild.emojis.filter(e=>e.toString()).size,
        }
              ],
              footer: {
                  icon_url: client.user.avatarURL,
                  text: "©️2018 Manon Information sur le serveur"
              }
            }
          });
    }

    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);



    if (message.content.startsWith(prefix + 'meteo'))  { 
        if(!message.guild) return;

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
        if (err) message.channel.send(err);

        
        if (result === undefined || result.length === 0) {
            message.channel.send('**Non Trouver**') 
            return;
        }

        var current = result[0].current; 
        var location = result[0].location; 

        
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`) 
            .setAuthor(`Lieux ${current.observationpoint}`) 
            .setThumbnail(current.imageUrl) 
            .setColor(0x00AE86) 
            .addField('Fuseau horaire:🕕 ',`UTC${location.timezone}`, true)
            .addField('degré:',`${location.degreetype}°`, true)
            .addField('Témperature:🌡 ',`${current.temperature} C°`, true)
            .addField('Vent:💨 ',current.windspeed,true)
            .addField('Humiditer: 💧', `${current.humidity}%`, true)
            
            message.channel.send({embed});
    });
}
})


client.on("message", message => {
    if (message.content.startsWith(prefix + "help")) {
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Commande du bot",
            description: "des commande modération et des commande utiles, pour utiliser les commande de moderation il vous suffit d'avoir la permission ``gérer le serveur``",
            fields: [{
    
              name:"👑Administrateur",
              value:"``sondage``, ``setautorole``, ``annonce``"
            },
            {
                name: "🛠 Modération",
                value: " ``ban``, ``kick``, ``mute``, ``unmute``,  ``addrole``, ``purge``, ``warn``"
              },
              {
                name: "⚙ Utiles",
                value: "``meteo``, ``afk``, ``delafk``, `info`, ``serverinfo``"
              },
              {
                name: "🎉fun",
                value: "``cookie``,``pat``, ``roll``, ``cat``, ``dog``"
              },
            ],
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Manon 2018"
            }
          }
        
        })}});
client.on("message", message => {
    if (message.content.startsWith(prefix + "logout")) {

        if(message.author.id == "373616425727819776"){
        
                message.reply("Arrêt en cour");
        
                console.log('Je suis off');
        
                client.destroy();
        
                process.exit()
        
            } else {
        
            message.channel.send("Pour quoi vouloir m'éteindre ;-;")
          }
    }

    if(message.content.startsWith(prefix + 'reboot')){
        if(message.author.id == "373616425727819776"){
            message.channel.send(":wave: Rebooting!")
            console.log("Reboot")
            setTimeout(function() {
                process.exit(1);
            }, 3 * 1000)
        }
    }

    if(message.content.startsWith(prefix + 'rename')){
        if(message.author.id == "373616425727819776"){
            client.user.setUsername(message.content.substr(8));
        } else {
            message.channel.send("Nop !")
          }
    }

    if (message.content.startsWith(prefix + 'debug')) {
        if(!message.guild) return;
        if (message.author.id !== '373616425727819776') {return message.reply("Ta crue que tu pouvais faire la commande bhien non :rage:")
    } else {
        var os = require('os');
        var cpu = os.loadavg();
        var embed = new Discord.RichEmbed()
        .setAuthor(client.user.username + " Commande Debug") 
        .setColor(12745742)
        .setThumbnail(client.user.avatarURL) 
        .addField("📋Nom du bot", client.user.tag, true)
        .addField("🆔ID", client.user.id, true)
        .addField("🤖Version","0.2.1", true)
        .addField("✏librairie", "Discord.js",true)
        .addField("📔Version discord.js", Discord.version, true)
        .addField("🔐Node", process.version, true)
        .addField("❔Présent sur ", client.guilds.size + " serveurs", true)
        .addField("🖥OS", process.platform, true)
        .addField("🚅Ram" , `${Math.round(process.memoryUsage().heapUsed / 1000000)}MB`, true)
        .addField("🕧En ligne depuis",(Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30) + " Jours, " + (Math.round(client.uptime / (1000 * 60 * 60))) + " h, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " min, est " + (Math.round(client.uptime / 1000) % 60) + " sec",true)
        .addField("🔥CPU", Math.ceil(cpu[1] * 100) / 10 + "%",true)
        .addField("☄Serveur en Commun", client.guilds.filter(g => g.members.has(message.author.id)).size, true)
        .addField("⚙Config", `(${os.arch()}) ${os.cpus()[0].model} @ ${os.cpus()[0].speed} MHz`, true)
        message.channel.send(embed);
    }}

    if(message.content.startsWith(prefix+ "vcs")){

        message.delete()
    
        var xo03 = message.content.split(" ").slice(1).join(" ");
    
        var xo02 = message.guild.channels.find('name', 'vcs-manon');
        
        if(message.channel.name == "vcs-manon"){
        
            if (message.author.id === "373616425727819776") {
            const fondateur_embed = new Discord.RichEmbed()
            .setColor("#FF0105")
    
            .addField("• Fondateur •", message.author.username)
        
            .addField("• Provenant du serveur •", message.guild.name)
        
            .addField("• ▬▬▬▬▬▬▬▬▬▬▬▬ •", xo03)
        
            .setFooter("Manon | vcs")
        
            .setThumbnail(message.guild.iconURL)
        
            .setTimestamp()
            message.delete()
            return client.channels.findAll("name", "vcs-manon").map(channel => channel.send(fondateur_embed));
        }
        if (message.author.id === "394879906095431681") {
            const moderateur_embed = new Discord.RichEmbed()
            .setColor("#FF0105")
    
            .addField("• Modérateur •", message.author.username)
        
            .addField("• Provenant du serveur •", message.guild.name)
        
            .addField("• ▬▬▬▬▬▬▬▬▬▬▬▬ •", xo03)
        
            .setFooter("Manon | vcs")
        
            .setThumbnail(message.guild.iconURL)
        
            .setTimestamp()
            message.delete()
            return client.channels.findAll("name", "vcs-manon").map(channel => channel.send(moderateur_embed));
        } 
        if (message.author.id === "328293076537966592") {
            const moderateur1_embed = new Discord.RichEmbed()
            .setColor("#FF0105")
    
            .addField("• Modérateur •", message.author.username)
        
            .addField("• Provenant du serveur •", message.guild.name)
        
            .addField("• ▬▬▬▬▬▬▬▬▬▬▬▬ •", xo03)
        
            .setFooter("Manon | vcs")
        
            .setThumbnail(message.guild.iconURL)
        
            .setTimestamp()
            message.delete()
            return client.channels.findAll("name", "vcs-manon").map(channel => channel.send(moderateur1_embed));
        }
        {
        let embedvcs = new Discord.RichEmbed()
    
        .setColor("#FF0105")
    
        .addField("• Utilisateur •", message.author.username)
    
        .addField("• Provenant du serveur •", message.guild.name)
    
        .addField("• ▬▬▬▬▬▬▬▬▬▬▬▬ •", xo03)
    
        .setFooter("Manon | vcs")
    
        .setThumbnail(message.guild.iconURL)
    
        .setTimestamp()
    
        return client.channels.findAll('name', 'vcs-Manon').map(a=>a.send(embedvcs))
        }
      }
    
        return message.channel.send("Il faut écrire dans le channel vcs-manon")
    
    }
})
