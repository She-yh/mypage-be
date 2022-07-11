const express = require('express')
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended:false}));

//全局中间件
app.use((req, res, next) => {
    res.cc = function(err , status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})


//一定要在路由之前解析token
const {expressjwt: expressJWT} = require('express-jwt')
const config = require('./const')
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: ["/api"] }))

//导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/user',userRouter);

//api路由模块
const apiRouter = require('./router/api')
app.use('/api',apiRouter);

//错误级别中间件
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') return res.cc("身份认证失败")
    res.cc(err)
})
app.listen(3007, () => {
    console.log('api server is running in http://127.0.0.1:3007')
})