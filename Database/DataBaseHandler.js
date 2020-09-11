const PathModule = require("path")
const FS = require("fs")
const SQLite = require("sqlite3").verbose()
const PathToDataBase = PathModule.join(__dirname, "MainDataBase.db")

module.exports.SetupData = function(){
    FS.access(PathToDataBase, FS.F_OK, (NoDatabase) => {
        if (NoDatabase){
            const SetupDatabase = new SQLite.Database(PathToDataBase, SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE)
            SetupDatabase.run("CREATE TABLE IF NOT EXISTS All_Servers(ServerId INTEGER NOT NULL, Prefix TEXT NOT NULL)")
            SetupDatabase.close()
        }
    })

    return
}

module.exports.AddData = function(GuildId){
    FS.access(PathToDataBase, FS.F_OK, (NoDatabase) => {
        if (NoDatabase) return

        const AddDatabase = SQLite.cached.Database(PathToDataBase, SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE)

        AddDatabase.get("SELECT * FROM All_Servers WHERE ServerId = ?", GuildId, (ProblemWithData, DataRow) => {
            if (ProblemWithData) return

            if (DataRow === undefined){
                const ServerInformation = AddDatabase.prepare("INSERT INTO All_Servers VALUES(?, ?)")
                ServerInformation.run(GuildId, ".")
                ServerInformation.finalize()
            }
        })
    })

    return
}

module.exports.DeleteData = function(GuildId){
    FS.access(PathToDataBase, FS.F_OK, (NoDatabase) => {
        if (NoDatabase) return

        const RemoveDatabase = SQLite.cached.Database(PathToDataBase, SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE)

        RemoveDatabase.get("SELECT * FROM All_Servers WHERE ServerId = ?", GuildId, (ProblemWithData, DataRow) => {
            if (ProblemWithData) return

            if (DataRow != undefined){
                RemoveDatabase.run("DELETE FROM All_Servers WHERE ServerId = ?", GuildId, (ProblemWithRemoving) => {
                    if (ProblemWithRemoving) return
                })
            }
        })
    })

    return
}