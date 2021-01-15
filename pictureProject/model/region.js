
module.exports = class Region extends require('./model') {
    static getCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `region1`'
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得总数失败：${ err.message }`)
            })
        })
    }
    static getList(start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`name` FROM `region1` LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList1() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`name` FROM `region1`'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList2() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`name`,`parent_id` FROM `region2`'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static add(data) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `region1` SET ?'
            this.query(sql, data).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加用户失败：${err.message}`)
                reject(err)
            })
        })
    }
    static add1(data) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `region2` SET ?'
            this.query(sql, data).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加用户失败：${err.message}`)
                reject(err)
            })
        })
    }
    static edit(id, name) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `region1` SET name = ? WHERE id = ?'
            this.query(sql, [name, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`修改失败：${err.message}`)
                reject(err)
            })
        })
    }
    static edit1(id, name) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `region2` SET name = ? WHERE id = ?'
            this.query(sql, [name, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`修改失败：${err.message}`)
                reject(err)
            })
        })
    }
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM `region1` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除失败：${err.message}`)
                reject(err)
            })
        })
    }
    static del1(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM `region2` WHERE parent_id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除失败：${err.message}`)
                reject(err)
            })
        })
    }
    static child(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`, `name` FROM region2 WHERE parent_id = ?'
            this.query(sql, [id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获得失败：${err.message}`)
                reject(err)
            })
        })
    }
    static child1(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `region2` WHERE parent_id = ?'
            this.query(sql, [id]).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得失败：${err.message}`)
                reject(err)
            })
        })
    }
    static del2(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM `region2` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除失败：${err.message}`)
                reject(err)
            })
        })
    }
}