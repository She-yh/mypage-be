const db = require('../db')

exports.getComments = (req, res) => {
    const sql = `select * from comments`
    db.query(sql, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) return res.cc('获取评论失败')
        res.setHeader('Content-Type', 'text/plain');
        return res.send(results)
    })
}
exports.addComments = (req, res) => {
    const {comment,commenter} = req.body;
    const date = new Date(new Date()).toLocaleDateString().replaceAll('/','-');
    const sql = `insert into comments(name,comments,time) values('${comment}','${commenter}','${date}')`
    db.query(sql, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) return res.cc('添加评论失败')
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