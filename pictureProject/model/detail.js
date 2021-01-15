module.exports = class Detail extends require('./model') {
    static getGirlById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `id`,`title`,`titleimg`,`isVideo`,`detail`,`video`,`img` FROM girl WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log(`获取数据详情失败：${err.message}`)
                reject(err)
            })
        })
    }
}