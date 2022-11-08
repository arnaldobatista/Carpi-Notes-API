const { Router } = require('express')
const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRoutes = require('./tags.routes')
const sessionsRouter = require("./sessions.routes")
const testRoutes = require('./teste.routes')
const routes = Router()


routes.use('/users', usersRouter) // aqui, eu estou dizendo que, quando alguém mandar uma requisição para o /users, ele deve ir para o usersRouter.
routes.use('/sessions', sessionsRouter)
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRoutes)
routes.use('/test', testRoutes)


module.exports = routes