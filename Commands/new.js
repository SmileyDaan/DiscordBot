// console.log("New is geladen")

// const Discord = require("discord.js")

// module.exports.run = async (Bot, MessageData, Arguments) => {

//     const categoryId = "753642504049393704";

//     var userName = MessageData.author.username;
//     var userDiscriminator = MessageData.author.userDiscriminator;

//     var ticketBestaat = false;

//     MessageData.guild.channels.cache.forEach(channel => {

//         if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
//             ticketBestaat = true;

//             MessageData.reply("Je hebt al een ticket.");

//             return;
//         }

//     });


//     if (ticketBestaat) return;

//     var Embed = new Discord.MessageEmbed()
//         .setTitle("Hoi" + MessageData.author.username)
//         .setFooter("Ticket wordt aangemaakt");

//     MessageData.channel.send(Embed);

//     MessageData.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
//         (createdChannel) => {
//             createdChannel.setParent(categoryId).then(
//                 (settedParent) => {

//                     settedParent.updateOverwrite(MessageData.guild.roles.cache.find(x => x.name === '@everyone'), {
//                         SEND_MESSAGES: false,
//                         VIEW_CHANNEL: false
//                     });

//                     settedParent.updateOverwrite(MessageData.author.id, {
//                         READ_MESSAGES: true,
//                         CREATE_INSTANT_INVITE: false,
//                         SEND_MESSAGES: true,
//                         ATTACH_FILES: true,
//                         CONNECT: true,
//                         ADD_REACTIONS: true,
//                         READ_MESSAGE_HISTORY: true
//                     });

//                     var embed = new Discord.MessageEmbed()
//                         .setTitle(`Hoi ${MessageData.author.username}`)
//                         .setDescription("Beschrijf hier je klacht/vraag alvast, het staff team komt z.s.m. bij u.");
//                     settedParent.send(embed);
//                 }
//             ).catch(err => {
//                 MessageData.channel.send("Error");
//             });
//         }
//     ).catch(err => {
//         MessageData.channel.send("Error");
//     });

// }


module.exports.run = async(Bot, MessageData, Arguments) => {
    MessageData.reply("Dit command is tijdelijk buiten gebruik.")
}