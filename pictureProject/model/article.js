/**
 * 文章数据模型
 */
module.exports = class Article extends require('./model') {
    /**
     * 获取热门推荐文章
     * @param {integer} num 条目数 
     */
    static getHot() {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT `id`,`title`,`titleimg`,`isVideo` FROM girl'
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                console.log(`获取数据失败：${err.message}`)
                reject(err)
            })
        })
    }
}