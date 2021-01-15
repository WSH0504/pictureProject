const Index = require('../model/index')

module.exports = {
    getList: (req, res, next) => {
        Index.getList(res.id).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList1: (req, res, next) => {
        Index.getList(req.query.id).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList2: (req, res, next) => {
        Index.getList1(req.query.id).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    like: (req, res, next) => {
        Index.like(req.body.id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}