const Detail = require('../model/detail')

module.exports = {
    getGirlById: (req, res, next) => {
        var id = req.params.id
        Detail.getGirlById(id).then(results => {
            req.girl = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}