const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'Xo6tHe5ESTla2yGrhZwbFIxPb2JBkBtZikMX-nJX'
const secretKey = '05woDsGfm_Gy0DQeRRob_qOH9XOQlFhmz6xgQcjm'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'girl777',
  expires: 720000
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}