console.log("Kick is geladen")

const discord = require("discord.js")

module.exports.run = async(Bot, Database, All_ServersData, MessageData, Args) => {
    if(!MessageData.member.hasPermission("KICK_MEMBERS")) return MessageData.reply("Je hebt niet hoog genoege permissions, alleen iemand met de Kick Members permission kan dit doen.");

    if(!MessageData.guild.me.hasPermission("KICK_MEMBERS")) return MessageData.reply("Geen perms.");

    if(!Arguments[0]) return MessageData.reply("Geen gebruiker opgegeven.");

    if(!Arguments[1]) return MessageData.reply("Geen reden opgegeven.");

    var kickUser = MessageData.guild.member(MessageData.mentions.users.first() || MessageData.guild.members.get(Arguments[0]));

    var reason = Arguments.slice(1).join(" ");

    if(!kickUser) return MessageData.reply("Gebruiker niet gevonden.");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Gelieve binnen 30 seconden te reageren.")
        .setDescription(`Wil je ${kickUser} kicken?`);

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setFooter(MessageData.member.displayName, "https://i.imgur.com/kEzkgLg.png")
        .setTimestamp()
        .setDescription(`**Gekicked: ** ${kickUser} (${kickUser.id})
        **Gekicked door:** ${MessageData.author}
        **Reden:** ${reason}`);

    MessageData.channel.send(embedPrompt).then(async msg =>{

        var emoji = await promptMessage(msg, MessageData.author, 30, ["✅", "❌"]);

        if(emoji === "✅"){

            msg.delete();

            kickUser.kick(reason).catch(err =>{
                if(err) return MessageData.reply("Er is iets fout gegaan.");
            });

            MessageData.channel.send(embed);

        } else if(emoji === "❌"){

            msg.delete();

            return MessageData.reply("Kick is geannuleerd.").then(m => m.delete(5000));

        }

    })

}

async function promptMessage(MessageData, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await MessageData.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return MessageData.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
}

async function promptMessage(MessageData, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await MessageData.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return MessageData.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}