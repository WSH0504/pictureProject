/**
 * 用户数据模型
 */
module.exports = class User extends require('./model') {
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
    static login(username, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,username FROM `user` WHERE username = ? AND PASSWORD = ?'
            this.query(sql, [username, password]).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取用户列表
     */
    static getUserList(start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`username` FROM `user` LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取用户列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getUserList1() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`username` FROM `user`'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取用户列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getUserList2(input,start,size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`username` FROM `user` WHERE username LIKE ? LIMIT ?,?'
            this.query(sql,[`%${input}%`,start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取用户列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获得用户总数
     */
    static getUserCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `user`'
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得用户总数失败：${ err.message }`)
            })
        })
    }
    static getUserCount1(input) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM `user` WHERE username LIKE ?'
            this.query(sql, [`%${input}%`]).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获得用户总数失败：${ err.message }`)
            })
        })
    }
    /**
     * 修改密码
     */
    static changePass(id, password) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `user` SET password = ? WHERE id = ?'
            this.query(sql, [password, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`修改密码失败：${err.message}`)
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
            let sql = 'DELETE FROM `user` WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除用户失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 添加用户
     */
    static add(user) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `user` SET ?'
            this.query(sql, user).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加用户失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 检验用户名是否存在
     */
    static checkUser(username) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM `user` WHERE `username` = ?'
            this.query(sql, username).then(results => {
                resolve(results.length)
            }).catch(err => {
                console.log(`获取用户列表失败：${err.message}`)
                reject(err)
            })
        })
    }
}