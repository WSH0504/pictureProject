const { compile } = require('ejs')
const Girl = require('../model/girl')


module.exports = {
    /**
     * 获得数据列表
     */
    getList: (req, res, next) => {
        if (req.session.user.username == 'admin') {
            Girl.getList(res.start, res.size).then(results => {
                req.girl = results
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            Girl.getList1(req.session.user.username,res.start, res.size).then(results => {
                req.girl = results
                next()
            }).catch(err => {
                next(err)
            })
        }
    },
    getList1: (req, res, next) => {
        var start = parseInt(req.query.start)
        var size = parseInt(req.query.size)
        if (req.session.user.username == 'admin') {
            Girl.getList(start, size).then(results => {
                req.girl = results
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            Girl.getList1(req.session.user.username,start, size).then(results => {
                req.girl = results
                next()
            }).catch(err => {
                next(err)
            })
        }
    },
    search: (req, res, next) => {
        var input = req.query.input
        var author_select = req.query.author_select
        var start = parseInt(req.query.start)
        var size = parseInt(req.query.size)
        if (req.session.user.username == 'admin') {
            Girl.getList2(input,author_select,start,size).then(results => {
                req.userList = results
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            Girl.getList3(req.session.user.username,input,author_select,start,size).then(results => {
                req.userList = results
                next()
            }).catch(err => {
                next(err)
            })
        }
        
    },
    /**
     * 获得用户总数
     */
    getDataCount: (req, res, next) => {
        if (req.session.user.username == 'admin') {
            Girl.getDataCount().then(results => {
                req.userCount = results
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            Girl.getDataCount1(req.session.user.username).then(results => {
                req.userCount = results
                next()
            }).catch(err => {
                next(err)
            })
        }
        
    },
    getDataCount1: (req, res, next) => {
        var input = req.query.input
        var author_select = req.query.author_select
        if (req.session.user.username == 'admin') {
            Girl.getDataCount2(input, author_select).then(results => {
                req.userCount = results
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            Girl.getDataCount3(req.session.user.username, input, author_select).then(results => {
                req.userCount = results
                next()
            }).catch(err => {
                next(err)
            })
        }
        
    },

    add: (req, res, next) => {
        var { title, titleimg, detail, isVideo, video, img, author, region1, region2 } = req.body.newData
        detail = JSON.stringify(detail)
        detail = detail.replace(/\\n/g, '<br>')
        detail = JSON.parse(detail)
        var newData = {
            title: title,
            titleimg: titleimg,
            detail: detail,
            isVideo: isVideo,
            video: video,
            img: img,
            author: author,
            region1: region1,
            region2: region2,
            like_num: 0,
        }
        console.log(newData)
        Girl.add(newData).then(result => {
            req.insertId = result
            req.code = 1
            next()
        }).catch(err1 => {
            next(err1)
        })
    },

    del: (req, res, next) => {
        let { id } = req.query
        Girl.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },

    edit: (req, res, next) => {
        let { title, detail, titleimg, isVideo, img, video, id, region1, region2 } = req.body.updateData
        detail = JSON.stringify(detail)
        detail = detail.replace(/\\n/g, '<br>')
        detail = JSON.parse(detail)
        let girl = {
            title: title,
            detail: detail,
            titleimg: titleimg,
            isVideo: isVideo,
            img: img,
            video: video,
            id: id,
            region1: parseInt(region1),
            region2: parseInt(region2)
        }
        Girl.edit(girl).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getdetail: (req, res, next) => {
        let { id } = req.query 
        Girl.getdetail(id).then(results => {
            req.girlDetail = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}