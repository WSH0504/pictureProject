const mysql = require('mysql')

/**
 * 数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {
    // 连接数据库对象


    /**
     * 数据库连接方法
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'picture'
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败： ${err.message}`)
            }
        })
    }
    /**
     * 关闭数据库连接
     */

    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用的查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params = []) {
        return new Promise((reslove, reject) => {
            this.connection()

            Model.conn.query(sql, params, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    reslove (results)
                }
            })

            this.end()
        })
    }
}