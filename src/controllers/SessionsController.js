const knex = require('../database/knex') // importar o sistema de mandar requisições para o backend
const AppError = require('../utils/AppError') // importando meu sistema de erros padronizados
const { compare } = require('bcryptjs') // vc precisa fazer a requisicao do bcript para poder fazer a comparacao da senha e saber se ela esta correta ou nao
const authConfig = require('../configs/auth') // imprtacao das configs do modulo que faz o token de autenticacao
const { sign } = require('jsonwebtoken') // importar o metodo sign

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        const user = await knex('users').where({email}).first() // aqui estou criando uma variavel que vai aguardar a requisição feita com o backend voltar, pesquisando na tabela users pelo email passado pelo front. o .firs() vai me trazer somente o primeiro item encontrado. ele vai me retornar todos os dados. caso vc queira somente um, vc precisa passar mais informacoes para sua pesquisa

        if(!user){ // fazendo o IF pra saber se os dados existem no banco de dados ou nao.
            throw new AppError('E-mail e/ou senha incorreta', 401) // criando um novo erro para mandar para o front. vc pode passar o numero do status code dps pra mandar para a requisicao
        }

        const passwordMatched = await compare(password, user.password) // aqui eu faco a comparacao da senha informada no front com a senha buscada no banco de dados. eu preciso passar um await, pois preciso que essa funcao espere o retorno da comparacao.

        if(!passwordMatched){ // o IF para verificar se a senha esta correta ou nao
            throw new AppError('E-mail e/ou senha incorreta', 401)
        }

        const { secret, expiresIn } = authConfig.jwt // desestrurutar as informacoes que tem no authConfig
        const token = sign({}, secret, { // aqui fazemos a criacao do tokem. precisamons colocar um obj vazio (aqui temos a possibilidade de colocar informacoes adcionais.), passar o secret que inserimos no authConfig, e um obj com o conteudo que eu quero inserir dentro do token.
            subject: String(user.id), // aqui eu queri inserir o ID do usuario que eu pequei da requisicao do banco de dados. quero converter esse id em uma string.
            expiresIn // aqui eu estou passando o tempo de ducacao do token
        })

        return res.json({ user, token }) // agora, eu quero devolver o usuario e o token para o frontend -- vc precisa passar essas informacoes usando um OBJ pois o token nao esta sendo retornado como obj e o user esta. 
    }
}

module.exports = SessionsController