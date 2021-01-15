module.exports = class Index extends require('./model') {
    static getList(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`region1`,`region2`,`like_num` FROM girl ORDER BY `time` desc'
            this.query(sql, [id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static getList1(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo` FROM girl where `region2` = ? ORDER BY `time` desc'
            this.query(sql, [id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    static like(id) {
        return new Promise((resolve, reject) => {
            let sql = 'update girl set like_num=like_num+1 where id = ?'
            this.query(sql, [id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取数据列表失败：${err.message}`)
                reject(err)
            })
        })
    }
}