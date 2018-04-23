var express = require('express');
var router = express.Router();
var UserModel = require('../model/user');
/* GET home page. */
//get和post响应的请求不同
//获取前端的post请求   req.body
//获取前端的get请求    req.query
// router.get('/', function (req, res, next) {
//   res.render('register', {
//     title: '5555'
//   });
// });


router.post('/', function (req, res, next) {
  var isrepet = false;
  UserModel.find({
    username:req.body.username,
  },function (err,data) {
     if (data.length==0) {
      UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      },function (err, data) {
        //执行成功 
        if (!err) {
          //重定向 跳转页面
          isrepet = true;
					res.send(isrepet)
        }else{
          isrepet = false;
    		 res.send(isrepet)
        }
       })
     }
  })
  //存数据库
  //创建数据进数据库

});
module.exports = router;