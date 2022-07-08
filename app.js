const express = require('express')
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended:false}));

//全局中间件
app.use((req, res, next) => {
    res.cc = function(err , status = 1){
        
    }
    next()
})

const userRouter = require('./router/user');
app.use('/user',userRouter);


app.listen(3007, () => {
    console.log('api server is running in http://127.0.0.1:3007')
})