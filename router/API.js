let express = require('express');//服务器插件
let cors = require('cors')
let bodyParser = require('body-parser');
let multer = require('multer');
let path = require('path');
let fs = require('fs')
// let cookiePareser = require('cookie-parser');//要获取cookie值的中间件
// var session = require('express-session');


//引入自己定义的模块
let toolsCode = require('../tools/code');//验证码模块
let sendEmailS = require('../tools/sendEmail');//发送验证码模块
let db = require('../db/db');//数据库集合模块
let crypto = require('../tools/crypto');//加密模块
// 引入jwt token工具
const JwtUtil = require('../tools/jwt');


let router = express.Router();//路由
let bodyS = bodyParser.urlencoded({ extended: true });
//传递一个包含静态资源的目录给express.static中间件用于立即开始提供文件
let pathS = path.resolve(__dirname, 'public');//要存入数据文件的路径
let newPath = express.static(pathS);


//使用中间件
// router.use(cookiePareser());//获取cookie值的中间件
// router.use(session({
//     resave: true, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     secret: 'love',
//     cookie: {
//         cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }    //这里就是设置了session的过期时间，配置文件中是120000，即20分钟。
//     },
// }));

router.use(express.static('public'));//静态资源管理
router.use(bodyS);


//设置文件存放在磁盘中
let strong = multer.diskStorage({
    //文件的路径
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    //数据文件的名称
    filename: function (req, file, cb) {
        let id = req.cookies.id;

        let str = id + new Date().getTime() + file.originalname;
        // 同时改变数据库里面用户的头像的图片路径
        db.user.updateOne({
            _id: id
        }, {
            $set: {
                userImg: '/upload/' + str
            }
        }).then(data => {
            cb(null, str);
        })

    }
})
let up = multer({ storage: strong })


router.use(cors({
    origin: 'http://127.0.0.1:8848',//允许跨域访问
    credentials: true
}));




//轮播图
router.get('/slideshow', (req, res) => {
    db.banner.find({})
        .then(data => {
            if (data.length != 0) {
                res.json({
                    status: 1,
                    data: data
                })
            }
        })
});

//分类
router.get('/classify', (req, res) => {
    db.classify.find({}).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

//即刻到达
router.get('/goto', (req, res) => {
    db.goto.find({}).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

//大的分类
router.get('/classify_name', (req, res) => {
    db.classify_name.find({}).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

//商品内容
router.get('/content', (req, res) => {
    db.content.find({}).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

//推荐
router.get('/recommend', (req, res) => {
    db.recommend.find({}).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

//热点
router.get('/hot', (req, res) => {
    db.classify_name.find({
        ico: '00',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//家庭保洁
router.get('/Household_cleaning', (req, res) => {
    db.list.find({
        ico: '01'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/Household_cleaning_classify', (req, res) => {
    db.classify_name.find({
        ico: '01',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//上门按摩
router.get('/massage', (req, res) => {
    db.list.find({
        ico: '02'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/massage_classify', (req, res) => {
    db.classify_name.find({
        ico: '02',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//上门维修
router.get('/repair', (req, res) => {
    db.list.find({
        ico: '03'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/repair_classify', (req, res) => {
    db.classify_name.find({
        ico: '03',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//家电清洗
router.get('/cleanout', (req, res) => {
    db.list.find({
        ico: '04'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/cleanout_classify', (req, res) => {
    db.classify_name.find({
        ico: '04',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//搬家拉货
router.get('/move', (req, res) => {
    db.list.find({
        ico: '05'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/move_classify', (req, res) => {
    db.classify_name.find({
        ico: '05',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//衣物洗护
router.get('/xh', (req, res) => {
    db.list.find({
        ico: '06'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/xh_classify', (req, res) => {
    db.classify_name.find({
        ico: '06',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//美容美妆
router.get('/beauty_makeup', (req, res) => {
    db.list.find({
        ico: '07'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/beauty_makeup_classify', (req, res) => {
    db.classify_name.find({
        ico: '07',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//上门安装 
router.get('/home_installation', (req, res) => {
    db.list.find({
        ico: '08'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});
router.get('/home_installation_classify', (req, res) => {
    db.classify_name.find({
        ico: '08',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//车主服务
router.get('/czfw', (req, res) => {
    db.list.find({
        ico: '09'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

router.get('/czfw_classify', (req, res) => {
    db.classify_name.find({
        ico: '09',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//保姆月嫂
router.get('/baby-sitter', (req, res) => {
    db.list.find({
        ico: '10'
    }).then(data => {
        if (data.length != 0) {
            res.json({
                data: data
            })
        }
    })
});

router.get('/baby-sitter_classify', (req, res) => {
    db.classify_name.find({
        ico: '10',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//鲜花
router.get('/flower_classify', (req, res) => {
    db.classify_name.find({
        ico: '11',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//装修服务
router.get('/finish_classify', (req, res) => {
    db.classify_name.find({
        ico: '12',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//更多
router.get('/more_classify', (req, res) => {
    db.classify_name.find({
        ico: '13',
    }).then(data => {
        if (data.length != 0) {
            res.json({
                json: data
            })
        } else {
            res.send("请求失败")
        }
    })
});

//详情分类
router.post('/shopping_list', (req, res) => {
    let { id } = req.body;
    db.classify_name.find({
        ico: id,
    }).then((data) => {
        if (data.length != 0) {
            res.json({
                status: 1,
                json: data
            })
        } else {
            res.send('请求失败')
        }
    })
});

//类别全部
router.post('/all_content', (req, res) => {
    let { type_id } = req.body;
    db.list.find({
        ico: type_id
    }).then((data) => {
        if (data.length != 0) {
            res.json({
                status: 1,
                json: data,
                length: data.length
            })
        } else {
            res.send('请求失败')
        }
    })
});

router.get('/all_data', (req, res) => {
    db.list.find({
    }).then((data) => {
        if (data.length != 0) {
            res.json({
                status: 1,
                json: data,
                length: data.length
            })
        } else {
            res.send('请求失败')
        }
    })
});

//子类接口
router.post('/son_content', (req, res) => {
    let { type_id } = req.body;
    db.list.find({
        type_id: type_id
    }).then((data) => {
        if (data.length != 0) {
            res.json({
                status: 1,
                json: data,
                length: data.length
            })
        } else {
            res.send('请求失败')
        }
    })
});

//全部数据分页接口page页数，pageSize数据
router.post('/pages', (req, res) => {
    var param = 1;
    var pageSize = req.body.pageSize;
    if (req.body.page == "") {
        param = 1
    } else {
        param = req.body.page
    }
    var start = (param - 1) * pageSize; //0  0  1  10 2  20
    db.list.find({}).then(data => {
        let allCount = data.length;
        // let allPage = (allCount%pageSize == 0?allCount/pageSize:allCount/pageSize + 1);
        let allPage = (parseInt(allCount) + parseInt(pageSize - 1)) / parseInt(pageSize);
        let pagination = {
            allCount: allCount,
            allPage: Math.floor(allPage),
            page: param
        }
        //定义一个空数组用于存放查询出的数据
        let shuju = [];
        let num = parseInt(start) + parseInt(pageSize)
        if (num < allCount) {
            for (var i = start; i < num; i++) {
                let liju = {
                    _id: data[i]._id,
                    title: data[i].title,
                    search: data[i].search,
                    price: data[i].price,
                    unit: data[i].unit,
                    url: data[i].url,
                    content: data[i].content,
                    time: data[i].time,
                    type_id: data[i].type_id,
                    shopping: data[i].shopping,
                    volume: data[i].volume,
                    evaluate: data[i].evaluate,
                    ico: data[i].ico
                };
                shuju.push(liju);
            }
        } else if (num > allCount) {

            for (var i = parseInt(start); i < allCount; i++) {

                let liju = {
                    _id: data[i]._id,
                    title: data[i].title,
                    search: data[i].search,
                    price: data[i].price,
                    unit: data[i].unit,
                    url: data[i].url,
                    content: data[i].content,
                    time: data[i].time,
                    type_id: data[i].type_id,
                    shopping: data[i].shopping,
                    volume: data[i].volume,
                    evaluate: data[i].evaluate,
                    ico: data[i].ico
                };
                shuju.push(liju);
            }
        }

        var data = { "code": 200, "data": shuju, "meta": pagination }
        res.send(data)
    })
});

//商品详情
router.get('/particulars', (req, res) => {
    let search = req.query.search;
    db.list.find({
        search: search
    }).then((data) => {
        if (data.length != 0) {
            res.json({
                json: data,
                status: 1,
            })
        } else {
            res.json({
                json: '没有数据',
                status: 0,
            })
        }
    })
})

//热门地址
router.get('/hotData', (req, res) => {
    db.hotData.find({}).then((data) => {
        res.json({
            data: data
        })
    })
})

//全部地址
router.get('/groupData', (req, res) => {
    db.groupData.find({}).then((data) => {
        res.json({
            data: data
        })
    })
})

//修改头像的接口
router.post('/revision', up.single('jpg'), (req, res) => {
    let id = req.cookies.id;
    //从数据库中拿到新的数据
    db.user.find({
        _id: id
    }).then(data => {
        if (data.length == 1) {
            res.json({
                status: 1,
                msg: '修改成功',
                userimg: data[0].userImg
            })
        } else {
            res.json({
                status: 0,
                msg: '修改失败'
            })
        }
    })
});

//检测注册验证码是否过期
setInterval(() => {
    let nowDate = new Date().getTime();
    //查找数据库
    db.code.find({}).then((data) => {
        if (data.length != 0) {
            data.forEach(item => {
                let dis = nowDate - item.time;//时间差
                if (dis > 60000) {
                    db.code.deleteOne({
                        time: item.time
                    }).then(data => {

                    })
                }
            })
        }
    })

}, 1000);

//注册接口
router.post('/register', bodyS, (req, res) => {
    let { email, pass, name } = req.body;//结构赋值
    if (email.trim() && pass.trim()) {
        db.user.find({
            username: name,
        }).then((data) => {
            if (data.length >= 1) {
                //存在
                res.json({
                    status: '2',
                    msg: '账号名存在'
                })
            } else {
                //成功
                db.user.create({
                    username: name,
                    email,
                    pass: crypto.cryptoS(pass),
                }).then((data) => {
                    if (data.length !== 0) {
                        // 登陆成功，添加token验证
                        let _id = data._id.toString();
                        // 将用户id传入并生成token
                        let jwt = new JwtUtil(_id);
                        let token = jwt.generateToken();
                        res.json({
                            status: 1,
                            msg: '注册成功',
                            token: token,
                            id: data._id
                        })

                    } else {
                        res.json({
                            status: '0',
                            msg: '注册失败'
                        })
                    }
                })
            }
        })

    }
});

//验证账号是否存在
router.post('/code-user', (req, res) => {
    let { email } = req.body;
    db.user.find({
        email,
    }).then((data) => {
        if (data.length >= 1) {
            res.json({
                status: 1,
                msg: email
            })
        } else {
            res.json({
                status: 1,
                msg: false
            })
        }
    })
})

//登录接口
router.post('/login', bodyS, (req, res) => {
    let { email, pass } = req.body;
    if (email.trim() && pass.trim()) {
        db.user.find({
            email,
            pass: crypto.cryptoS(pass),
        }).then((data) => {
            if (data.length == 1) {
                // 登陆成功，添加token验证
                let _id = data[0]._id.toString();
                // 将用户id传入并生成token
                let jwt = new JwtUtil(_id);
                let token = jwt.generateToken();
                res.json({
                    status: 1,
                    msg: '登录成功',
                    token: token,
                    id: data[0]._id
                })
            } else {
                res.json({
                    status: 0,
                    msg: '登录失败'
                })
            }
        })
    } else {
        res.json({
            status: 0,
            msg: '登录失败'
        })
    }
});

//注册验证 登录验证
router.post('/reg-login', (req, res) => {
    let { email, code } = req.body;
    db.code.find({
        email,
        code,
    }).then((data) => {
        if (data.length >= 1) {
            res.json({
                status: 1,
                msg: '注册验证成功'
            })
        } else {
            res.json({
                status: 0,
                msg: '注册验证失败'
            })
        }
    })
})
//个人信息
router.get('/personal', (req, res) => {
    //获取session所存的账户
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    if (result == 'err') {
        //登录过期
        res.json({ status: 403, msg: '登录已过期,请重新登录' });
    } else {
        if (req.query.id) {
            //在数据库中查找用户信息
            db.user.find({
                _id: req.query.id
            }).then((data) => {
                if (data.length == 1) {
                    //登录状态
                    res.json({
                        status: 1,
                        msg: '已登录',
                        //用户相关信息
                        username: data[0].username,
                        userimg: data[0].userImg,
                        email: data[0].email,
                        sex: data[0].sex
                    })
                }

            })
        } else {
            //未登录状态
            res.json({
                status: 0,
                msg: '未登录',
            })
        }
    }
});
//修改用户信息
router.post('/alterpersonal', up.single('jpg'), (req, res) => {
    let { id, photo, sex, username } = req.body;
    if(photo==''){
        if (sex && username.trim()) {
            db.user.updateOne({
                _id: id
            }, {
                $set: {
                    sex,
                    username,
                }
            }).then(data => {
                if (data.length !== 0) {
                    res.json({
                        status: 200,
                        msg: '修改成功'
                    })
                }else{
                    res.json({
                        status: 500,
                        msg: '修改失败'
                    })
                }
            })
        }
    }else{
        if (sex && username.trim()) {
            console.log(photo)
            db.user.updateOne({
                _id: id
            }, {
                $set: {
                    sex,
                    username,
                    userImg: photo
                }
            }).then(data => {
                if (data.length !== 0) {
                    res.json({
                        status: 200,
                        msg: '修改成功'
                    })
                }else{
                    res.json({
                        status: 500,
                        msg: '修改失败'
                    })
                }
            })
        }
    }
    
})

//验证码接口
router.post('/code', bodyS, (req, res) => {
    let { email } = req.body;
    if (email.trim()) {

        let codeS = toolsCode.code();//验证码
        //检查邮箱是否已被注册
        db.user.find({
            email: email,
        }).then((data) => {
            if (data.length == 0) {
                //就临时存在数据库中code中
                db.code.create({
                    email,
                    code: codeS,
                    time: new Date().getTime()
                }).then((data) => {
                    //给用户发送邮件
                    sendEmailS.main({
                        email: email,
                        content: codeS,
                    });
                    res.json({
                        status: 1,
                        msg: '已发送'
                    })
                })
            } else {//有数据的时候
                res.json({
                    status: 2,
                    msg: '邮箱已被注册'
                })
            }
        })
    } else {
        res.json({
            status: '0',
            msg: '邮箱无效',
        })
    }
});
//暴露模块
module.exports = router;