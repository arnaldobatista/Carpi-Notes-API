/*
um controler só vai ter 5 funcoes dentro dele
index GET para listar vários registros.
show GET para exibir um registro especifico.
create POST para criar um registro.
update PUT para atualizar um registro.
delete DELETE para remover um registro.
----
o await é uma promisse, usamos ela quando precisamos que algo espere dar um retorno para poder continuar. -- um ex. é a senha. se 
usarmos somente o codigo:
const hashedPassword = hash(password, 8) ele vai salvar um OBJ vazio. precisamos diser que ele precisa esperar a criptografia terminar para poder continuar.
const hashedPassword = await hash(password, 8) 
*/

const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { response } = require('express')


class UsersController {
    async create(req, res) { // isso é uma função. não é necessario você fazer uma função ou uma () => {} pois sendo ele uma classe, ele já sabe que o que tem aqui dentro é função. 
        const {name, email, password} = req.body // estou desestrurutando o name, email e password vindo da requisição.
        const database = await sqliteConnection() // me conectar com os banco de dados.
        const checkUserExist = await database.get(`SELECT * FROM users WHERE email = ?`, [email]) // estou pegando o email do banco de dados pra ver se ele existe mais a frente
        // const checkUserExist = await database.get(`SELECT * FROM users WHERE email =${email}`) // posso fazer assim também.

        if(checkUserExist){ // se o email existir, ele vai me dar erro, se não, ele vai seguir o codigo.
          throw new AppError('Email ja existe')
        }

        const hashedPassword = await hash(password, 8) // aqui eu estou pegando a senha vinda do front e criptografando ela.

        await database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword]) // aqui, eu passo a senha do usuario de forma criptografada.

        return res.status(201).json()
    }
    async update(req, res) {
        const {name, email, password, old_password} = req.body
        const user_id = req.user.id // dentro da requisição, temos o id do usuario

        const database = await sqliteConnection() // se conectar ao banco de dados.
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]) // pegar o usuario do  ID passado no link.
        
        if(!user) { // verificar se existe esse usuario nesse id
            throw new AppError('Usuário não encontrado')
        }
        
        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]) // pega todos os emails do banco de dados

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){ // verifica se o email existe no banco de dados e se o id desse email já existe
            throw new AppError('Este email já esta em uso')
        }

        user.name = name ?? user.name // o que esse ?? faz. se existir alguma coisa dentro do name, ele vai manter, se não ele vai colocar algo novo.
        user.email = email ?? user.email

        if(password && !old_password) {// aqui ele fala se ele digitou uma nova senha, e se ele digitou a senha antiga.
            throw new AppError('Informe sua senha antiga!')
        }

        if(password && old_password) { // aqui estou verificando se as duas senhas foram informadas
            const checkOldPassword = await compare(old_password, user.password)
            
            if(!checkOldPassword) {
                throw new AppError('A senha antiga não confere')
            }

            user.password = await hash(password, 8)
        }



        await database.run("UPDATE users SET name = (?), email = (?), password = ?, updated_at = DATETIME('now') WHERE id = (?)", [user.name, user.email, user.password, user_id])

        return res.json()
    }
}

module.exports = UsersController 