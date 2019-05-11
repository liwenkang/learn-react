const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 链接 mongodb,使用 imooc 这个集合
const DB_URL = '';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo 链接成功');
});

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, required: true},
    age: {type: Number, required: true}
}));

User.create({
    name: 'imooc',
    age: 18
}, function (err, doc) {
    if (!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
});

app.get('/', function (req, res) {
    res.send('<h1>啦啦啦</h1>');
});
app.get('/data', function (req, res) {
    res.json({name: 'la111'});
});
app.listen(9093, function () {
    console.log('node app start at 9093');
});