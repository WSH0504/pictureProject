/**
 * 首页子应用
 */
const express = require('express')
const index = require('../middleware/index')
const region = require('../middleware/region')
const System = require('../middleware/system')
//首页子应用
const indexApp = express()

indexApp.get('/', [region.getList1, region.getList2], (req, res, next) => {
    let { list1 } = req
    res.id = list1[0].id
    next()
}, [index.getList, System.getImg, System.getline], (req, res) => {
    let { list, list1, list2, imgList, address } = req
    var dataString = JSON.stringify(list)
    list = dataString
    dataString = JSON.stringify(list1)
    list1 = dataString
    dataString = JSON.stringify(list2)
    list2 = dataString
    dataString = JSON.stringify(imgList)
    imgList = dataString
    dataString = JSON.stringify(address)
    address = dataString
    res.render('index', { list: list, list1: list1, list2: list2, imgList: imgList, address: address, })
})

indexApp.get('/getlist0', index.getList1, (req, res) => {
    let { list } = req
    res.json({ list: list})
})

indexApp.get('/getlist1', index.getList2, (req, res) => {
    let { list } = req
    res.json({ list: list})
})

indexApp.post('/like', index.like, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '修改成功' })
    } else {
        res.json({ code: 2, msg: '修改失败' })
    }
})
module.exports = indexApp