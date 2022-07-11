const express = require('express')
const apiRouter = express.Router()
const apiHandler = require('../router_handler/api')

apiRouter.get('/getComments',apiHandler.getComments)
apiRouter.get('/getMovies', apiHandler.getMovies)

module.exports = apiRouter