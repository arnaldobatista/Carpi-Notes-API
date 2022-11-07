const config = require('../../../knexfile') // estou chamando as configurações do knex. (configs de onde fica os arquivos do banco de dados entre outras coisas)
const knex = require('knex') //preciso chamar o knex.

const connection = knex(config.development) // estou fazendo uma const informando todas as configuraçconfigurações e o knex de uma vez para poder exportar tudo com uma palavra.

module.exports = connection