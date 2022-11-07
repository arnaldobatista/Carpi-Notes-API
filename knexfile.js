const path = require('path') // chamando o path, é a parada que resolve os caminhos em qualquer sistema operacional. 

module.exports = {
  development: {
    client: 'sqlite3', // na configuração do knex eu passo qual banco de dados eu estou usando como padrão.
    connection: { // onde esta o arquivo principal do banco de dados.
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool: { // aqui eu estou habilitando a opção de apagar as itens em cascata
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    migrations: { // isso aqui são as migrations. eleesta mostrando o caminho para essa pasta. aqui ele vai salvar as alterações feitas no banco de dados, para caso eu queria voltar a forma anterior.
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true // não lembro o que é
  }
};
