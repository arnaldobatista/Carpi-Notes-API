const { Router } = require('express')
const multer = require('multer') // esse modulo server para fazer o upload para o backend
const uploadConfig = require('../configs/upload') // importando as configuracoes de upload

const UsersController = require('../controllers/UsersController') // aqui você esta chamando a classe UsersController. quando você chama uma classe, você precisa alocar ela em uma espaço de memoria.
const UserAvatarController = require('../controllers/UserAvatarController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER) // 

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create) // aqui, eu estou gerando o arquivo da rota users. não esta sendo passado aqui porque esse arquivo esta sendo referenciado somente para o users.
usersRoutes.put('/', ensureAuthenticated, usersController.update) // passando o ensureAuthenticated entre o nome da rota e pra onde a rota aponta, vc consegue add o diddleware de altenticacao
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update )// rota para alterar foto de usuario. 

module.exports = usersRoutes