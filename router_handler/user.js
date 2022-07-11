const bcryptjs = require('bcryptjs')
const db = require('../db')

const jwt = require('jsonwebtoken')
const config = require('../const')

exports.regUser = (req, res) => {
    return res.send('reguser ok')
}

exports.logIn = (req, res) => {
    const userInfo = req.body
    const sql = `select * from userInfo where username=?`
    if(!userInfo.username || !userInfo.password) {
        return res.cc("用户名或密码不合法")
    }
    db.query(sql, userInfo.username, (err, results) => {
        if(err) return res.cc(err);
        if(results.length !== 1) {
            if(results.length === 0) return res.cc("未查询到用户信息")
            else return res.cc("用户重复注册")
        }
        const compareResult = bcryptjs.compareSync(userInfo.password, results[0].password)
        if(!compareResult){
            return res.cc("密码错误")
        }
        const user = { ...results[0], password: '', realname: ''};
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
        return res.send({
            status: 0,
            message: '登录成功',
            token: 'Beare ' + tokenStr
        })
    })
}