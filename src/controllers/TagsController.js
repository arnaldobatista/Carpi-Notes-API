const knex = require('../database/knex')

class TagsController {
    async index(req, res) {
        const user_id = req.user.id // pegando o user_id dos parametros da requisição (link)

        const tags = await knex('tags') // falando para o knex ir no banco de dados e...
        .where({ user_id }) // procurar por pela coluna user_id
        .groupBy('name')
        return res.json(tags) // o retorno dessa função vai ser o resultado do que o banco de dados conseguiu colalizar
    }
}

module.exports = TagsController