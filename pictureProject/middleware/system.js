const System = require('../model/system')

module.exports = {
    getImg: (req, res, next) => {
        System.getImg().then(results => {
            req.imgList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    addimg: (req, res, next) => {
        var { img } = req.body
        System.addimg(img).then(result => {
            req.affectedRows = result
            req.code = 1
            next()
        }).catch(err1 => {
            next(err1)
        })
    },
    getline: (req, res, next) => {
        System.getline().then(results => {
            req.address = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    editline: (req, res, next) => {
        var { address } = req.body
        System.editline(address).then(result => {
            req.affectedRows = result
            req.code = 1
            next()
        }).catch(err1 => {
            next(err1)
        })
    },
}