const sqliteConnection = require('../../sqlite') //chamo o sqlite
const createUsers = require('./createUsers') // estou chamando o os comandos SQlite

async function migrationsRum(){
    const schemas = [
        createUsers
    ].join('')// o .join estajuntandp todos os paramentos dos comandos que estamos chamando e passando como paramentro: nada. -- o comando vai ficar em uma unica linha. 

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error))
}

module.exports = migrationsRum