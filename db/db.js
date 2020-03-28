let mongoose = require('mongoose');

//定义模板

//轮播图
let banner = mongoose.Schema({
    num: Number,//序号
    url: String,
    content: Array
});

//分类
let classify_name = mongoose.Schema({
    ico: String,
    name: String,
    type_name: Array
});
//类容
let content = mongoose.Schema({
    ico: String,
    obj: Object
});

//商品
let list = mongoose.Schema({
    title: String,
    search: Number,
    price: Number,
    unit: String,
    url: String,
    time: String,
    content: String,
    type_id: Number,
    shopping: String,
    volume: Number,
    evaluate: String,
    ico: String
});

//即刻到达
let goto = mongoose.Schema({
    title: String,
    url: String,
    _id: Number,
    _ico: String,
});

//小分类
let classify = mongoose.Schema({
    obj: Array,
});

//推荐
let recommend = mongoose.Schema({
    url: String,
})

//code
let code = mongoose.Schema({
    code: String,
    email: String,
    time: Number,
});

//user集合表
let userS = mongoose.Schema({
    username: {
        type: String,
        default: Math.floor(Math.random() * 1000)
    },
    pass: String,
    userImg: {
        type: String,
        default: 'http://120.55.103.137/images/photo.png'
    },
    sex:{
        type:String,
        default:''
    },
    email: String,
});
//hot地理位置
let hotData = mongoose.Schema({
    pinyin: String,
    longitude: Number,
    latitude: Number,
    sort: Number,
    area_code: Number,
    abbr: String,
    name: String,
    id: Number
})
//groupData地理位置

let groupData = mongoose.Schema({
    group: Object
})

// mongoose.connect('mongodb://127.0.0.1:27017/dw', (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         let dbs = mongoose.model('groupData', groupData);
//         //插入数据

//         dbs.create(
//             {
       
           
         
//         }
//         )
//     }
// });
//暴露数据库集合

module.exports = {
    banner: mongoose.model('banner', banner),
    code: mongoose.model('code', code),
    user: mongoose.model('user', userS),
    classify: mongoose.model('classify', classify),
    classify_name: mongoose.model('classify_name', classify_name),
    goto: mongoose.model('goto', goto),
    list: mongoose.model('list', list),
    content: mongoose.model('content', content),
    recommend: mongoose.model('recommend', recommend),
    hotData: mongoose.model('hotData', hotData),
    groupData: mongoose.model('groupData', groupData),
};