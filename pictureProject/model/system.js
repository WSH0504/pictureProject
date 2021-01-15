
module.exports = class System extends require('./model') {
    static getImg() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,img FROM `carousel` WHERE id = 1'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取失败：' + err.message)
                reject(err)
            })
        })
    }
    static addimg(img) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE carousel SET img = ? WHERE id = 1'
            this.query(sql, [img]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑数据失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getline() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,address FROM `line` WHERE id = 1'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取失败：' + err.message)
                reject(err)
            })
        })
    }
    static editline(address) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE line SET address = ? WHERE id = 1'
            this.query(sql, [address]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑数据失败：${err.message}`)
                reject(err)
            })
        })
    }
}