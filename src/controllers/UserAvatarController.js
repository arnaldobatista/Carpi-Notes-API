const knex = require('../database/knex') // importar o knex -- usado para fazer alteracoes do banco de dados. 
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController { 
    async update(req, res){
        const user_id = req.user.id // estrou pegando o id do usuario que quer atualizar o avatar do usuario
        const avatarFileName = req.file.filename // estou pegando o nome do arquivo enviado

        const diskStorage = new DiskStorage() // preciso estanciar o DiskStorage -- nao sei o porque

        const user = await knex('users') // estrou dizendo ao knex, para ele procurar dentro da tabela users, um id referente ao pego pelo user_id
            .where({ id: user_id }).first() // o first serve para pegar o primeiro
            
            if (!user) { // verificando se o usar existe. ( o user mostra se o usuario esta logado ou nao )
                throw new AppError('Somente usuários autenticados podem mudar o avatar')
            }

            if(user.avatar) { // verificando se existe uma foto antiga
                await diskStorage.deleteFile(user.avatar) // o deleteFile é uma funcao que a gente criou. ela serve para fazer o delete de um arquivo.
            }

            const filename = await diskStorage.saveFile(avatarFileName) // colocando na variavel, a funcao de salvar o novo arquivo de avatar.
            user.avatar = filename // estou passando para dentro do user.avatar, o resultado do filename

            await knex("users").update(user).where({ id: user_id }) // mandando para o banco de dados, a atualizacao da imagem para dentro da tabela users procurando pelo id de usuario.

            return res.json(user)
    }


}

module.exports = UserAvatarController