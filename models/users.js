const mongoose = require('mongoose')

// 首先  连接数据酷
// { useMongoClient: true }
mongoose.connect('mongodb://localhost/text')
const  Schema = mongoose.Schema
   var userSchema= new Schema({
       nickname:{
           type:String,
           required:true
       },
       password:{
           type:String,
           required:true
       },
       email:{
           type:String,
           required:true
       },
       creatTime:{
           type:Date,
           default:Date.now
       },
       lastMofifyTime:{
           type:Date,
           default:Date.now
       },
       avatar:{
           type:String,
           default:'/public/img/avatar-default.png'
       },
       bio:{
           type:String,
           default:''
       },
       gender:{
           type:Number,
           enum:[-1,0,1],
           default:-1
       },
       birthday:{
           type:Date
       },
       statu:{
           type:Number,
           enum:[0,1,2],
           default:0
           // 0 没有权限限制
           // 1 不可以评论
           // 2不可以登录
       }
   })

// 最后以模型的方式抛出
module.exports = mongoose.model('User',userSchema)

