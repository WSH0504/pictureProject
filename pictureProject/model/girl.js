/**
 * 女孩数据模型
 */
module.exports = class Girl extends require('./model') {
    /**
     * 获取数据列表
     * @param {integer} start 起始索引
     * @param {integer} size 查询条目数
     */
    static getList(start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`time`,`author`, `img`, `video`, `region1`, `region2`, `like_num`, `detail` FROM girl ORDER BY TIME DESC LIMIT ?,?'
            this.query(sql,[start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList1(author, start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`time`,`author`, `img`, `video`, `region1`, `region2`, `like_num`, `detail` FROM girl where author = ? ORDER BY TIME DESC LIMIT ?,?'
            this.query(sql, [author, start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList2(input, author_select, start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`time`,`author`, `img`, `video`, `region1`, `region2`, `like_num`, `detail` FROM girl WHERE 1=1'
            if(input != '') {
                sql += ` AND title LIKE '%${input}%'`
            }
            if (author_select != '') {
                sql += ` AND author = '${author_select}'`
            }
            sql += ' ORDER BY TIME DESC LIMIT ?,?'
            this.query(sql,[start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList3(author, input, author_select, start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`time`,`author`, `img`, `video`, `region1`, `region2`, `like_num`, `detail` FROM girl WHERE author = ?'
            if(input != '') {
                sql += ` AND title LIKE '%${input}%'`
            }
            if (author_select != '') {
                sql += ` AND author = '${author_select}'`
            }
            sql += ' ORDER BY TIME DESC LIMIT ?,?'
            this.query(sql,[author, start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获得用户总数
     */
    static getDataCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `girl`'
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得数据总数失败：${ err.message }`)
            })
        })
    }
    static getDataCount1(author) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `girl` where author = ?'
            this.query(sql, author).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得数据总数失败：${ err.message }`)
            })
        })
    }
    static getDataCount2(input, author_select) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `girl` WHERE 1=1'
            if(input != '') {
                sql += ` AND title LIKE '%${input}%'`
            }
            if (author_select != '') {
                sql += ` AND author = '${author_select}'`
            }
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得数据总数失败：${ err.message }`)
            })
        })
    }
    static getDataCount3(author,input, author_select) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `girl` where author = ?'
            if(input != '') {
                sql += ` AND title LIKE '%${input}%'`
            }
            if (author_select != '') {
                sql += ` AND author = '${author_select}'`
            }
            this.query(sql, author).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得数据总数失败：${ err.message }`)
            })
        })
    }
    /**
     * 添加数据
     */
    static add(newData) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `girl` SET ?'
            this.query(sql, newData).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加数据失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 删除文章
     * @param {integer}} id 文章编号
     */
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM `girl` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除用户失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 编辑文章
     * @param {Object} article 文章对象
     */
    static edit(girl) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE girl SET title = ?, detail = ?, titleimg = ?, isVideo = ?, img = ?, video = ?, region1 = ?, region2 = ? WHERE id = ?'
            this.query(sql, [girl.title, girl.detail, girl.titleimg, girl.isVideo, girl.img, girl.video, girl.region1, girl.region2, girl.id ]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑数据失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getdetail(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`time`,`author`, `img`, `video`, `region1`, `region2`, `like_num`, `detail` FROM girl WHERE id = ?'
            this.query(sql,[id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
}