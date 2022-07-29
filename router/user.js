const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')//导入路由处理函数
router.post('/reguser', userHandler.regUser)

router.post('/login', userHandler.logIn)

router.post('/deleteComments',userHandler.deleteComments)
module.exports = router