/**
 * 后台首页
 */
const express = require('express')
const auth = require('../../middleware/auth')
const UserList = require('../../middleware/user')

const UserApp = express()

UserApp.use(auth.getUser)

/**
 * 加载首页
 */
UserApp.get('/', UserList.getUserCount, (req, res, next) => {
    let { userCount } = req
    req.userCount = userCount
    res.start = 0
    res.size = 20

    next()
    
}, UserList.getUserList, (req, res) => {
    let { user, userList, userCount } = req
    var dataString = JSON.stringify(userList);
    userList = dataString
    res.render('admin/user', { user: user, list: userList, userCount: userCount })
})

UserApp.get('/getList0', [UserList.getUserList2, UserList.getUserCount], (req, res) => {
    let { userList, userCount } = req
    res.json({ userList: userList, userCount: userCount })
})

UserApp.get('/search', [UserList.search, UserList.getUserCount1], (req, res) => {
    let { userList, userCount } = req
    res.json({ userList: userList, userCount: userCount })
})

UserApp.get('/changepass', UserList.changePass, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '修改成功' })
    } else {
        res.json({ code: 0, msg: '修改失败' })
    }
})

UserApp.get('/del', UserList.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

UserApp.post('/add', UserList.add, (req, res) => {
    if (req.code === 2) {
        res.json({ code: 2, msg: '用户名已存在' })
    } else if (req.code == 1) {
        res.json({ code: 1, msg: '添加成功'})
    }
})

module.exports = UserApp