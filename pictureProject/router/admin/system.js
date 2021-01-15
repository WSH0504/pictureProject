/**
 * 后台首页
 */
const express = require('express')
const auth = require('../../middleware/auth')
const System = require('../../middleware/system')

const SystemApp = express()

SystemApp.use(auth.getUser)

/**
 * 加载首页
 */
SystemApp.get('/', [System.getImg, System.getline], (req, res) => {
    let { user, imgList,address } = req
    var dataString = JSON.stringify(imgList);
    imgList = dataString
    dataString = JSON.stringify(address);
    address = dataString
    res.render('admin/system/index', { user: user, imgList: imgList, address: address })
})
SystemApp.post('/addimg', System.addimg, (req, res) => {
    if (req.code === 1) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})
SystemApp.post('/editline', System.editline, (req, res) => {
    if (req.code === 1) {
        res.json({ code: 1, msg: '添加成功'})
    } else {
        res.json({ code: 2, msg: '添加失败'})
    }
})

module.exports = SystemApp