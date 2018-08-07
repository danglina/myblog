const  express = require('express')
const fs = require('fs')
const  path = require('path')
const  app = express()
const router = require('./router')
const session = require('express-session')
// 引用bodyparser进行post的转意
const  bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 引进session
app.use(session({
//配置加密字符串 ，比原有的的，在原有的字符串的基础上，再加上他
//必须要加上，目的是更加的安全，防止客户端恶意伪造
    secret: 'keyboard cat',
    resave: false,
    //这句是指，无论你需不需session都会分配一把钥匙
    saveUninitialized: false
}))
// 引进session

// 引入express-art-template 模板
app.engine('html', require('express-art-template'))

// 设置views的位置
app.set('vews',path.join(__dirname,'./views/'))
// 设置视图view 的位置

// 引入共工模块
app.use('/public',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))

app.use(router)

app.get('/',(req,res)=>{

})
app.listen(3001,()=>{
    console.log('success')
})