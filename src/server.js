require('express-async-errors') // preciso importar isso para poder tratar os erros
require("dotenv").config() // dotenv serve para tratar chaves e senha. coisas relacionadas a seguranca
const migrationsRum = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError') // preciso importar o appError pra poder usalo em algo que eu queira aqui.
const uploadConfig = require('./configs/upload') // importando o uploadconfig para poder verificar a foto de perfil

const cors = require('cors') // o cors serve para podermos conectar o backend com o frontend.
const express = require('express')
const routes = require('./routes')

migrationsRum()

const app = express()
app.use(cors()) // estou colocando do cors em todo meu backend.
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER)) // estou falando que quem acessar de dentrodo uploadConfig a UPLOADS_FOLDER

app.use(routes) // quando uma requisição for feita para meu sistema, ele vai encontrar essa linha que diz: app, use o routes. o routes esta sendo importado do ./routes.

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    console.error(error)
    return res.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
})
const PORT = process.env.SERVER_PORT || 8180
app.listen(PORT, () => console.log(`Server is running on part ${PORT}`))
