console.log("Warn is geladen")

const Discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (Bot, Database, All_ServersData, MessageData, Args) => {
    if (!MessageData.member.hasPermission("MANAGE_ROLES")) return MessageData.reply("Je hebt niet hoog genoege permissions, alleen iemand met de Manage Roles permission kan dit doen.");

    if (!MessageData.guild.me.hasPermission("MANAGE_ROLES")) return MessageData.reply("Geen perms.");

    if (!Arguments[0]) return MessageData.reply("Geen gebruiker opgegeven.");

    if (!Arguments[1]) return MessageData.reply("Geen reden opgegeven.");

    var WarnUser = MessageData.guild.member(MessageData.mentions.users.first() || MessageData.guild.members.get(Arguments[0]));

    var reason = Arguments.slice(1).join(" ");

    if (!WarnUser) return MessageData.reply("Gebruiker niet gevonden.");

    if (WarnUser.hasPermission("MANAGE_ROLES")) return MessageData.reply("Je kunt geen staffleden warnen.");

    if (!warns[WarnUser.id]) warns[WarnUser.id] = {
        warns: 0
    };

    warns[WarnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    console.log("1")

    var embed = new Discord.MessageEmbed()
        .setColor("0099ff")
        .setFooter(MessageData.member.displayName, "https://i.imgur.com/kEzkgLg.png")
        .setTimestamp()
        .setDescription(`**Gewarned: ** ${WarnUser.tag} ${WarnUser.id}
        **Gewarned door:** ${MessageData.author}
        **Reden:** ${reason}`)
        .addField("Aantal warns", warns[WarnUser.id].warns);

    var logchannel = MessageData.member.guild.channels.cache.get("753635601667981364");

    logchannel.send(embed);

    if (warns[WarnUser.id].warns == 5) {
        MessageData.guild.member(WarnUser).kick(reason);
        MessageData.channel.send(`${WarnUser} is gekicked vanwege teveel warns.`);
    }
}