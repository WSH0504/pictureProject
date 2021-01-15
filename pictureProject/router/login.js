/**
 * 登陆子应用
 */
const express = require('express')
const User = require('../model/user')

//文章子应用
const loginApp = express()

//加载登录页
loginApp.get('/', (req, res) => {
    res.render('login', { msg: '' })
})

//实现登陆操作
loginApp.post('/login', (req, res, next) => {
    let { username, password } = req.body
    User.login(username, password).then(result => {
        if(result) {
            // session存储（key=value）
            req.session.user = result
            res.json({ code: 1, msg: '修改成功' })
        } else {
            res.json({ code: 0, msg: '修改失败' })
        }
    }).catch(err => {
        next(err)
    })
})

module.exports = loginApp