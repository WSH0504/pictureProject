const express = require('express')
const detail = require('../middleware/detail')
const System = require('../middleware/system')
const detailApp = express()

detailApp.get('/:id', [detail.getGirlById, System.getline], (req, res) => {
    let { girl, address } = req
    var dataString = JSON.stringify(address)
    address = dataString
    dataString = JSON.stringify(girl)
    girl = dataString
    res.render('detail', { girl: girl, address: address })
})

module.exports = detailApp