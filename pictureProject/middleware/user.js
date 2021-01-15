const User = require('../model/user')

module.exports = {
    /**
     * 获得用户列表
     */
    getUserList: (req, res, next) => {
        User.getUserList(res.start, res.size).then(results => {
            req.userList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getUserList2: (req, res, next) => {
        var start = parseInt(req.query.start)
        var size = parseInt(req.query.size)
        User.getUserList(start, size).then(results => {
            req.userList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getUserList1: (req, res, next) => {
        User.getUserList1().then(results => {
            req.authors = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    search: (req, res, next) => {
        var input = req.query.input
        var start = parseInt(req.query.start)
        var size = parseInt(req.query.size)
        User.getUserList2(input,start,size).then(results => {
            req.userList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获得用户总数
     */
    getUserCount: (req, res, next) => {
        User.getUserCount().then(results => {
            req.userCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getUserCount1: (req, res, next) => {
        var input = req.query.input
        User.getUserCount1(input).then(results => {
            req.userCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    changePass: (req, res, next) => {
        let { id, password } = req.query
        User.changePass(id, password).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },

    del: (req, res, next) => {
        let { id } = req.query
        User.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },

    add: (req, res, next) => {
        let { username, password } = req.body
        User.checkUser(username).then(results => {
            console.log('用户总数：'+results)
            if (results > 0) {
                req.code = 2
                next()
            } else if (results === 0) {
                let user = {
                    username: username,
                    password: password
                }
                User.add(user).then(results1 => {
                    req.insertId = results1
                    req.code = 1
                    next()
                }).catch(err1 => {
                    next(err1)
                })
            }
        }).catch(err => {
            next(err)
        })
    }
}