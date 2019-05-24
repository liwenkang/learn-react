const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 链接 mongodb,使用 imooc 这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo 链接成功');
});

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, required: true},
    age: {type: Number, required: true}
}));

User.update({user: '小黄'}, {'$set': {age: 999}}, function (err, doc) {
    console.log(doc)
})

app.get('/', function (req, res) {
    res.send('<h1>啦啦啦</h1>');
});
app.get('/user', function (req, res) {
    return res.json({
        user: '哈哈'
    });
});
app.get('/data', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc);
    });
});
app.listen(9093, function () {
    console.log('node app start at 9093');
});