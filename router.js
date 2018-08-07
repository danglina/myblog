const  express = require('express')
const  router =  express.Router()
// 这是给密码进行加密  引进来的

const md5 = require('blueimp-md5')
var User = require('./models/users')




router.get('/',(req,res)=>{
    // 进行首页的渲染
    res.render('index.html',{
        user:req.session.user
    })
})

router.get('/login',(req,res)=>{
    res.render('login.html')
})

router.post('/login',(req,res)=>{

    var body  =  req.body
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },(err,data)=>{
        if(err){
           return  res.status(500).json({
                err_code:500,
                message:'service error'
            })
        }
        if(!data){
            return  res.status(200).json({
                err_code:1,
                message:'email or password is invalid'
            })
        }
        req.session.user = data
         res.status(200).json({
            err_code:0,
            message:'very ok'
        })

    })
})


// 注册页面
router.get('/register',(req,res)=>{
    res.render('register.html',{
        message:'用户名，或邮箱已经存在'
    })
})
router.post('/register',(req,res)=>{
    // 1 获取数据
    // 2 操作数据库
    // 判断用户是否存在
    // 账户  或密码错误
    // 3 将数据返回给用户

    var body = req.body
    User.findOne({
        $or:[
            {email:body.email},
            {nickname:body.nickname}
        ]
    },(err,data)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:'server false'
            })
        }
        if(data){
            // 这里一定要加 return 否则返回会抱错
           return  res.status(200).json({
                err_code:1,
                message:'nickname or email false'
            })

              return res.render('register.html',{
                  message:'jjj'
              })

        }
        body.password = md5(md5(body.password))
        new User(body).save((err,data)=>{
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'server false'
                })
            }
            // data，是我们条表格的数据
            // 一般服务器间的信息传递是对象
            req.session.user = data
            res.status(200).json({
                err_code:0,
                message:'register success'
            })

        })
    })
})
router.get('/logout',(req,res)=>{
req.session.user = null
    res.redirect('/')
})



module.exports = router;