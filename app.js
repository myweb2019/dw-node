let express = require('express');//开启服务器组件
let mongoose = require('mongoose');


//引入自己定义的模块
let router = require('./router/API');

let app = express();

app.use('/',router,function (req,res) {

});
mongoose.connect('mongodb://127.0.0.1:27017/dw', function (err) {
    if (!err) {
        //监听端口
        app.listen(80);
    }
});

