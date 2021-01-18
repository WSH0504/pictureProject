/**
 * 入口模块
 */
const express = require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
// 创建服务
const app = express()

// 上传配置
const upload = multer({
    dest: './static/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 100 // 单个文件大小限制在100M以内
    }
})



//模板引擎的设置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源配置
app.use(express.static('static'))

// POST请求处理
app.use(express.urlencoded({ extended: true }))

// SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000 * 60 * 30
}))

// SESSION延期
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})


//调用首页子应用
app.use(/\/(index)?/, require('./router/index'))
app.use('/detail', require('./router/detail'))
//调用登陆子应用
app.use('/login', require('./router/login'))

// 进入后台的权限验证
app.use('/admin/?*', require('./middleware/auth').allowToAdmin)

// 上传操作
app.post('/admin/uploadphoto', upload.single('file'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    console.log(req)
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = 'http://185.243.57.225:3000/upload/' + file.filename + extname
        res.send(file)
    }
    next()
})


// 调用后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'))
// 调用数据管理
app.use('/admin/girl', require('./router/admin/girl'))
// 调用地区管理
app.use('/admin/region', require('./router/admin/region'))
// 调用系统管理
app.use('/admin/system', require('./router/admin/system'))
// 调用用户管理
app.use('/admin/user', require('./router/admin/user'))

// 引入七牛云配置
const qnconfig = require('./config.js')
// 处理请求
app.get('/admin/token', (req, res, next) => {
  res.status(200).send(qnconfig.uploadToken)
})

// 退出
app.get('/user/logout', (req, res) => {
    req.session.user = null
    res.render('login', { msg: '退出成功' })
})

//监听服务器
app.listen(3000)
