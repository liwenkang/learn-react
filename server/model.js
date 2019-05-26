const mongoose = require('mongoose');

// 链接 mongodb,使用 imooc 这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 个人简介 / 职位简介
    'desc': {type: String, require: true},
    // 根据身份的不同, title 是 要找的职位名称/发布的职位名称
    'title': {type: String},
    // 如果你是 boss
    'company': {type: String},
    'money': {type: String},
  },
  chat: {
    // 聊天功能
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};