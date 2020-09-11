console.log("Help is geladen")

const Discord = require("discord.js")

module.exports.run = async (Bot, Database, All_ServersData, MessageData, Args) => {
    const Embed = new Discord.MessageEmbed()
        .setTitle("**Alle commands**")
        .addFields(
            { name: "Voor iedereen:", value: "`.online` `.help`" },
            { name: "Voor moderator's:", value: "`.kick` `.ban` `.clear` `.warn`" }
        )
        .setFooter("Made by smileydaan#7644")
        .setColor("#1aff1a")
        .setTimestamp()

    MessageData.author.send(Embed)
    MessageData.channel.send("Check je DM :wink: ")
}