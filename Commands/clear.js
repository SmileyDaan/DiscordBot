console.log("Clear is geladen")

const Discord = require("discord.js");

module.exports.run = async(Bot, Database, All_ServersData, MessageData, Args) => {
    if (!MessageData.member.hasPermission("MANAGE_MESSAGES")) return MessageData.reply("Je hebt geen perms, Je hebt hier de manage messages permissions voor nodig.");

    if (!Arguments[0]) return MessageData.reply("Geef het aantal berichten dat je wil verwijderen op `.clear {aantal hier}`");

    if (Number.isInteger(parseInt(Arguments[0]))) {

        var amount = parseInt(Arguments[0]) + 1;

        MessageData.channel.bulkDelete(amount).then(() => {

            if (Arguments[0] <= 0) {
                MessageData.reply("Als je wil dat ik je rommel nog opruim moet je even een nummer hoger dan 0 invullen he slimpie.").then(msg => msg.delete({ timeout: 5000 }));
            } else if (Arguments[0] === 1) {
                MessageData.reply("Ik heb 1 bericht verwijderd").then(msg => msg.delete({ timeout: 4000 }));
            } else {
                MessageData.reply(`Ik heb ${Arguments[0]} berichten verwijderd`).then(msg => msg.delete({ timeout: 4000 }));
            }

        })

    } else {
        return MessageData.reply("Geef een nummer op inplaats van teskt/tekens");
    }
}