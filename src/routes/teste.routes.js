const { Router } = require('express')
const testRoutes = Router()

testRoutes.get('/', (req, res) => res.send('API rodando'))

module.exports = testRoutes