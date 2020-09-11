require("dotenv").config()
const Discord = require("discord.js")
const PathModule = require("path")
const FS = require("fs").promises
const Bot = new Discord.Client()
let CommandsMap = new Map()
const DatabaseHandler = require("./Database/DataBaseHandler")
const SQLite = require("sqlite3").verbose()

//Settings
const Prefix = "."

//Code
async function LoadCommands(CommandDirectory) {
    const CommandFiles = await FS.readdir(PathModule.join(__dirname, CommandDirectory))

    for (let CurrentCommand of CommandFiles) {
        CurrentCommandStatus = await FS.lstat(PathModule.join(__dirname, CommandDirectory, CurrentCommand))

        if (CurrentCommandStatus.isDirectory()) {
            LoadCommands(PathModule.join(CommandDirectory, CurrentCommand))
        } else {
            if (CurrentCommand.endsWith(".js")) {
                const CurrentCommandName = CurrentCommand.replace(".js", "")
                const CurrentCommandModule = require(PathModule.join(__dirname, CommandDirectory, CurrentCommand))
                CommandsMap.set(CurrentCommandName, CurrentCommandModule)
            }
        }
    }

}

Bot.on("ready", () => {
    LoadCommands("Commands")
    DatabaseHandler.SetupData()
    Bot.user.setActivity("Jou! ;)", { type: "LISTENING" })

    console.log(`Succesfully logged in to: ${Bot.user.tag}`)
})

Bot.on("guildCreate", guild => {
    DatabaseHandler.AddData(guild.id)
})

Bot.on("guildDelete", guild => {
    DatabaseHandler.DeleteData(guild.id)
})

Bot.on("message", MessageData => {
    if (MessageData.author.id === Bot.user.id || MessageData.author.bot || MessageData.channel.type != "text") return
    const Database = SQLite.cached.Database(`./Database/MainDataBase.db`, SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE)

    Database.get("SELECT * FROM All_Servers WHERE ServerId = ?", MessageData.guild.id, (ProblemWithData, All_ServersData) => {
        if (ProblemWithData || All_ServersData === undefined) {
            MessageData.channel.send("Er is iets fout gegaan bij het ophalen van de data. Probeer het opnieuw.")
            if (ProblemWithData) {
                console.log(ProblemWithData)
            }
            return
        }
        if (!MessageData.content.startsWith(All_ServersData.Prefix)) return

        const CommandArgs = MessageData.content.substring(MessageData.content.indexOf(All_ServersData.Prefix) + 1).split(new RegExp(/\s+/))
        const CommandName = CommandArgs.shift().toLowerCase()

        if (CommandsMap.get(CommandName)) {
            CommandsMap.get(CommandName).run(Bot, Database, All_ServersData, MessageData, CommandArgs)
        }
    })
})

Bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('753284988472000581');

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('753286493346463753');

    if (!channel) return;

    channel.send(`:wave: Welkom op de server ${member} :wave: `);

})

Bot.login(process.env.BOT_TOKEN)