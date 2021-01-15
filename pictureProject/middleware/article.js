const Article = require('../model/article')

module.exports = {
    getHot : (req, res, next) => {
        Article.getHot().then(results => {
            req.hots = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}