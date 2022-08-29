const express = require('express')
const app = express();

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});
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
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//,'/user/login'] }))

//导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/user',userRouter);

//api路由模块
const apiRouter = require('./router/api')
app.use('/api',apiRouter);

//错误级别中间件
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        return res.cc("身份认证失败")
    }
    res.cc(err)
})
app.listen(3007, () => {
    console.log('api server is running in http://127.0.0.1:3007')
})