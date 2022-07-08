const bcryptjs = require('bcryptjs')
console.log(bcryptjs.hashSync("15730319191",10), bcryptjs.hashSync("Syh20001123.", 10))
exports.regUser = (req, res) => {
    res.send('reguser ok')
}

exports.logIn = (req, res) => {
    const userInfo = req.body
    if(!userInfo.username || !userInfo.password) {
        return res.send({ status: 1, message: "用户名或密码密码不合法"})
    }
    res.send('login ok')
}

