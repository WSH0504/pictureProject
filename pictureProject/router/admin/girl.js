/**
 * 后台类目管理
 */
const express = require('express')
const girl = require('../../middleware/girl')
const region = require('../../middleware/region')
const User1 = require('../../middleware/user')
const auth = require('../../middleware/auth')

const girlApp = express()

girlApp.use(auth.getUser)

girlApp.get('/', girl.getDataCount, (req, res, next) => {
    let { userCount } = req
    req.userCount = userCount
    res.start = 0
    res.size = 10
    next()
}, [girl.getList, region.getList1, region.getList2, User1.getUserList1 ], (req, res) => {
    let { user, girl, userCount, list1, list2, authors } = req
    var dataString = JSON.stringify(girl)
    girl = dataString
    dataString = JSON.stringify(list1)
    list1 = dataString
    dataString = JSON.stringify(list2)
    list2 = dataString
    dataString = JSON.stringify(authors)
    authors = dataString
    res.render('admin/girl/index', { user: user, girl: girl, total: userCount, list1: list1, list2: list2, authors: authors })
})

girlApp.get('/getList0', [girl.getList1,girl.getDataCount], (req, res) => {
    let { girl, userCount } = req
    res.json({ girl: girl, userCount: userCount })
})

girlApp.get('/search', [girl.search, girl.getDataCount1], (req, res) => {
    let { userList, userCount } = req
    res.json({ girl: userList, userCount: userCount })
})

girlApp.get('/getdetail', [girl.getdetail], (req, res) => {
    let { girlDetail } = req
    res.json({ girlDetail: girlDetail })
})

girlApp.get('/getCount', girl.getDataCount, (req, res) => {
    let { userCount } = req
    res.json({ total: userCount })
})

girlApp.post('/add', girl.add, (req, res) => {
    if (req.code === 1) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

girlApp.get('/del', girl.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

girlApp.post('/edit', girl.edit, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '修改成功' })
    } else {
        res.json({ code: 2, msg: '修改失败' })
    }
})

module.exports = girlApp