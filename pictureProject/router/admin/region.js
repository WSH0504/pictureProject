/**
 * 后台首页
 */
const express = require('express')
const auth = require('../../middleware/auth')
const regionList = require('../../middleware/region')

const regionApp = express()

regionApp.use(auth.getUser)

/**
 * 加载首页
 */
regionApp.get('/', regionList.getCount, (req, res, next) => {
    let { count } = req
    let size = 20
    req.page = {}
    req.page.count = count
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()
}, regionList.getList, (req, res) => {
    let { user, list, page } = req
    var dataString = JSON.stringify(list);
    page.list = dataString
    res.render('admin/region', { user: user, page: page })
})

regionApp.post('/add', regionList.add, (req, res) => {
    if (req.code == 1) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

regionApp.post('/add1', regionList.add1, (req, res) => {
    if (req.code == 1) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

regionApp.get('/edit', regionList.edit, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

regionApp.get('/edit1', regionList.edit1, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

regionApp.get('/del', regionList.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})
regionApp.get('/del1', regionList.del1, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

regionApp.get('/child', regionList.child, (req, res) => {
    let { list } = req
    res.json({ list: list })
})

regionApp.get('/child1', regionList.child1, (req, res) => {
    let { total } = req
    res.json({ total: total })
})

regionApp.get('/del2', regionList.del2, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

module.exports = regionApp