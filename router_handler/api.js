const db = require('../db')

exports.getComments = (req, res) => {
    const sql = `select * from comments`
    db.query(sql, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) return res.cc('获取评论失败')
        return res.send(results)
    })
}

exports.getMovies = (req, res) => {
    const sql = `select * from movies`
    db.query(sql, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) return res.cc('获取电影失败')
        return res.send(results)
    })
}