const sqlite3 = require('sqlite3') 
const sqlite = require('sqlite')
const path = require('path') // o path e responsavel por saber em quando em qual sistema operacional nossa aplicaçao esta rodando

async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, '..', 'database.db'),
        driver: sqlite3.Database
    })
    return database
}

module.exports = sqliteConnection