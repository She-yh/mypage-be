const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'mypage',
    password: 'Syh20001123.',
    database: 'mypage',
    charset: 'utf8mb4'
})

module.exports = db;

