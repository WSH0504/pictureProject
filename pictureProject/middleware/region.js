const Region = require('../model/region')

module.exports = {
    getCount: (req, res, next) => {
        Region.getCount().then(results => {
            req.count = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList: (req, res, next) => {
        Region.getList(res.start, res.size).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList1: (req, res, next) => {
        Region.getList1().then(results => {
            req.list1 = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList2: (req, res, next) => {
        Region.getList2().then(results => {
            req.list2 = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    add: (req, res, next) => {
        let { name } = req.body
        let data = {
            name: name
        }
        Region.add(data).then(results1 => {
            req.insertId = results1
            req.code = 1
            next()
        }).catch(err1 => {
            next(err1)
        })
    },
    add1: (req, res, next) => {
        let { name, parent_id } = req.body
        let data = {
            name: name,
            parent_id: parent_id
        }
        Region.add1(data).then(results1 => {
            req.insertId = results1
            req.code = 1
            next()
        }).catch(err1 => {
            next(err1)
        })
    },
    edit: (req, res, next) => {
        let { id, name } = req.query
        Region.edit(id, name).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    edit1: (req, res, next) => {
        let { id, name } = req.query
        Region.edit1(id, name).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    del: (req, res, next) => {
        let { id } = req.query
        Region.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    del1: (req, res, next) => {
        let { id } = req.query
        Region.del1(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    child: (req, res, next) => {
        let { id } = req.query
        Region.child(id).then(results => {
            req.list = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    child1: (req, res, next) => {
        let { id } = req.query
        Region.child1(id).then(results => {
            req.total = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    del2: (req, res, next) => {
        let { id } = req.query
        Region.del2(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}