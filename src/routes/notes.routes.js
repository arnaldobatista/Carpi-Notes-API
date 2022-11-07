const {Router} = require('express')
const NotesController = require('../controllers/NotesController') // aqui você esta chamando a classe UsersController. quando você chama uma classe, você precisa alocar ela em uma espaço de memoria.
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const notesRoutes = Router()


const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)// aqui, eu estou passando o middleware para todas as rotas de uma vez.

notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create) // aqui, eu estou gerando o arquivo da rota users. não esta sendo passado aqui porque esse arquivo esta sendo referenciado somente para o users.
notesRoutes.get('/:id', notesController.show) // aqui, estou passando as informações de postagens que o usuaurio solicitou através do ID no link.
notesRoutes.delete('/:id', notesController.delete) // criando a rota para deletar...

module.exports = notesRoutes