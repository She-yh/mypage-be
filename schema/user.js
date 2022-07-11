//表单校验
const joi = require('joi')

const schema = {
    username: joi.string().min(9).max(12).required().error(new Error('用户名格式不正确')),
    password: joi.string().pattern(/^[\S]{8,16}$/).required().error(new Error('密码格式不正确'))
}
exports.reg_login_schema = {
    body: {
        
    }
}