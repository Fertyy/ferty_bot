require('dotenv').config()
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

const logs = require('discord-logs');
  logs(Client)

const prefix = "!";

const a = 0;

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", member => {
    console.log("un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "897913588721795102").send("Souhaitez la bienvenue à notre nouveau membre <@" + member.id + "> ! Que la force soit avec toi :wink:");
    member.roles.add("897905667430555678").then(mbr => {
        console.log("rôle attribué pour " + mbr.displayName);
    }).catch(() => {
        console.log("Le rôle na pas pu être attribué");
    });
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "boutique"){
        const embed = new Discord.MessageEmbed()
            .setColor("#0029ff")
            .setTitle(":moneybag: Boutique 917th")
            .addField("Vous avez demander la boutique ?", "Il vous suffit simplement d'écrire '__**donate**__' pour que mon coéquipier <@404365332912930827> puisse vous envoyez le lien !")
            .setThumbnail("https://cdn3.iconfinder.com/data/icons/crowdfunding-4/64/x-20-512.png");
        message.channel.send({ embeds: [embed]});
    }
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "candidature"){
        const embed = new Discord.MessageEmbed()
            .setColor("#0029ff")
            .setTitle("Comment candidater :question:")
            .addField("L'équipe administrative ou animatrice vous intéresse ?", "Pour tenter votre chance, il suffit de suivre ces instructions :\n\n• Créer sa candidature sur un [Google Doc](https://www.google.com/intl/fr-CA/docs/about/).\n• Faire apparaître votre âge.\n• Faire apparaître vos motivations.\n• Faire apparaître votre expérience.\n• Tout ce que vous pensez qu'il est utile de savoir.\n\nUne fois terminé, posté votre lien dans <#900334715658203216> et attendez une réponse du staff !")
            .setThumbnail("https://cdn.iconscout.com/icon/free/png-256/office-staff-9-1184344.png");
        message.channel.send({ embeds: [embed]});
    }
});

Client.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if (message.member.roles.cache.has("897935267657314394")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès");
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }

        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }

        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else{
                let args = message.content.split(" ");

                mention.roles.add("900393115347726426");
                mention.roles.remove("897905667430555678");

                message.channel.send(mention.displayName + " a été mute pendant " + args[2] + " secondes");

                setTimeout(function(){
                    mention.roles.remove("900393115347726426");
                    mention.roles.add("897905667430555678");
                    message.channel.send("<@" + mention.id + "> peut de nouveau parler.")
                }, args[2] * 1000);
            }   
        }

        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else{
                mention.roles.remove("900393115347726426");
                mention.roles.add("897905667430555678");
                message.reply(mention.displayName + " unmute avec succès");
            }
        }

        else if(message.content.startsWith(prefix + "minuteur")){
            let mention = message.mentions.members.first();
            do {
                const a = a + 1

                if(a >= 3600){
                    a = a / 3600 + "heure(s)";
                } else if(a >= 60){
                    a = a / 60 + "minute(s)";
                } else a = a + "seconde(s)";

            } while (message.content.startsWith(prefix + "stop"));
            
            
            message.reply(mention.displayName + " a effectuer un service de " + a);
            
        }

    }
    else {
        return;
    }
});



Client.login("095b1dbc3f26aa4b81d319693904e51ae57e7adf3d78e75f2936dc524dc04a3d");