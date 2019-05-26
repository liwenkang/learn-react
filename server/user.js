const express = require('express');
const utility = require('utility');
const Router = express.Router();
const UserModel = require('./model');
const User = UserModel.getModel('user');

const _filter = {
  pwd: 0,
  __v: 0
};

Router.get('/list', function (req, res) {
  // User.remove({}, function (err, doc) {
  //
  // });
  User.find({}, function (err, doc) {
    return res.json(doc);
  });
});

function md5Pwd(pwd) {
  const salt = 'dawop12ko32i9090()&^^$$%#$#%^$%&^*HBTY%%';
  return utility.md5(utility.md5(pwd + salt));
}

Router.post('/register', function (req, res) {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  // 为了不重复的用户名
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    } else {
      // 新建用户
      const userModel = new User({user, pwd: md5Pwd(pwd), type});
      userModel.save(function (err, doc) {
        if (err) {
          return res.json({code: 1, msg: '后端出错啦,没能成功注册!'});
        }
        const {user, type, _id} = doc;
        // 写入 cookie
        res.cookie('userid', _id);
        return res.json({code: 0, data: {user, type, _id}});
      });
      // User.create({user, pwd: md5Pwd(pwd), type}, function (err, doc) {
      //   if (err) {
      //     return res.json({code: 1, msg: '新增用户时, 后端出错了'});
      //   }
      //   // 添加成功, 登陆状态改为登陆 0
      //   return res.json({code: 0});
      // });
    }
  });
});

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body;
  // pwd 设置为 0, 就不会显示给用户了
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (doc) {
      // 找到了,用户成功登陆
      // 设置 cookie 在 resource 中写
      res.cookie('userid', doc._id);
      return res.json({code: 0, data: doc});
    } else {
      // 没找到该用户
      return res.json({code: 1, msg: '该用户名不存在或者密码错误!'});
    }
  });
});

Router.get('/info', (req, res) => {
  // 用户有没有 cookie, 返回不同的信息
  // 1 表示用户没有登陆
  // 0 表示用户登录了
  // 从请求中获取 cookie
  const {userid} = req.cookies;
  if (!userid) {
    // 没有用户 id
    return res.json({code: 1});
  }
  // 不希望暴露 pwd
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错: 当前 userid 未找到'});
    }
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  });
});

module.exports = Router;