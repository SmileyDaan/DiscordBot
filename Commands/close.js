// console.log("Close is geladen")

// const Discord = require("discord.js")

// module.exports.run = async (Bot, MessageData, Arguments) => {
//     const categoryId = "753642504049393704";
//     if (!MessageData.member.hasPermission("KICK_MEMBER")) return MessageData.reply("Je hebt niet hoog genoege permissions, iemand met Kick Members permissions moet dit doen.")
//     if (MessageData.channel.parentID == categoryId) {
//         MessageData.channel.delete();
//         var CloseEmbed = new Discord.MessageEmbed()
//             .setTitle("Ticket, " + MessageData.channel.name)
//             .setDescription("Het ticket is **gesloten**.")
//             .setFooter("Ticket gesloten.");
//         var TicketChannel = MessageData.member.guild.channels.cache.find(channel => channel.name === "logs");
//         if (!TicketChannel) return MessageData.reply("Kanaal bestaat niet.");
//         TicketChannel.send(CloseEmbed);
//     } else {
//         MessageData.channel.send("Dit command kan alleen worden uitgevoerd in een ticket");

//     }
// }