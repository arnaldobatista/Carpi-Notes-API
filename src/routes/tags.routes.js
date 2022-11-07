const {Router} = require('express')
const TagsController = require('../controllers/TagsController') // aqui você esta chamando a classe UsersController. quando você chama uma classe, você precisa alocar ela em uma espaço de memoria.
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const tagsRoutes = Router()


const tagsController = new TagsController()

tagsRoutes.get('/', ensureAuthenticated, tagsController.index)


module.exports = tagsRoutes