/**
 * 发送邮箱验证码
 */
function code() {
    //生成随机4位数
    return Math.round(Math.random() * 9999)+1000;
}

module.exports = {
    code
};