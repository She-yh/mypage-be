const express = require('express')
const apiRouter = express.Router()
const apiHandler = require('../router_handler/api')

apiRouter.get('/comments',apiHandler.getComments)
apiRouter.post('/comments',apiHandler.addComments)
apiRouter.get('/movies', apiHandler.getMovies)

module.exports = apiRouter