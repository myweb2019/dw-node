// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

//创建token 的 类
class Jwt {
    constructor(data) {
        this.data = data;
    }

    //生成token
    generateToken() {
        let data = this.data;
        let created = Math.floor(new Date().getTime() / 1000);//时间
        let cret = fs.readFileSync(path.join(__dirname,'../public/rsa_private_key.pem'))//私钥 可以自己生成
        let token = jwt.sign({
            data:data+ 60 * 60 * 7,
            exp: created + 60 * 60 * 7,
        },cret,{
            algorithm: 'RS256'
        });
        return token;
    }

    //检验token
    verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.join(__dirname,'../public/rsa_private_key.pem'));//公钥 可以自己生成
        let res;
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result, current = Math.floor(new Date().getTime() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }


}

module.exports = Jwt;