const { verify } = require('jsonwebtoken') // essa importacao serve para eu fazer a verificacao do token passado para o front.
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth') // configuracores do token

function ensureAuthenticated(req, res, next){ // fazer o middleware
    const authHeader = req.headers.authorization // a autorizacao do usuario vai esta vindo da requisicao, vai esta no cabecalio vindo do authorization

    // após pegar as informacoes da requisicao, eu preciso fazer uma verificacao se o token realmente esta vindo.
    if(!authHeader){
        throw new AppError('JWT Token não informado', 401) // se o retorno for false, vou passar um erro para o front usando o apperror.
    }

    const [, token] = authHeader.split(' ') // quando a requisicao do token vem do front, ela vem do sequinte formato "Bare xxxxtokenxxxx". como nos so queremos o token, presisamos usar o .split(' ') passado para ele o espaco que divide a requisicao. dps que ele fizer isso, vou passar esse token para uma variavel que eu ja criei dentro de um array, passando a virgula com nada atras para nao puchar o bare tambem.

    try { // estou passando um try e catch para fazer a verificação do token
        const { sub: user_id } = verify(token, authConfig.jwt.secret) // estou que, caso o token exista, verificar se o  token passado esta ok. preciso passar a senha de criptografia do token também. o virify vai me devolver um resultado. desse resltado, eu consigo desestruturar o sub. Quando eu uso o sub: user_id, eu estou criando um apelido para eu ter acesso de outra forma.

        req.user = { // estamos criando dentro do corpo da requisiçã, o user.id. passando o user_id para ele. 
            id: Number(user_id)
        }

        return next() 
    }catch {
        throw new AppError('JWT Token inválido', 401)
    }
}

module.exports = ensureAuthenticated