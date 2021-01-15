/**
 * 后台首页
 */
const express = require('express')
const auth = require('../../middleware/auth')

const indexApp = express()

indexApp.use(auth.getUser)

/**
 * 加载首页
 */
indexApp.get('/', (req, res) => {
    let { user } = req
    res.render('admin/index', { user: user })
})

module.exports = indexApp