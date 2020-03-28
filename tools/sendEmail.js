const nodemailer = require("nodemailer");

function main(obj) {

    let testAccount = nodemailer.createTestAccount();

    //发送方
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "1612675620@qq.com", // generated ethereal user
            pass: "iwypxyvinkvrbjbc" //注册码
        }
    });

    //接受方
    let info = transporter.sendMail({
        from: '"到位服务" <1612675620@qq.com>', // sender address
        to: obj.email, // 接受方的qq邮箱
        subject: "验证码有效时间1分钟", // 标题
        text: '验证码为：'+obj.content, // 发送的内容
    });

    //发送
    nodemailer.getTestMessageUrl(info);
 }

 module.exports = {
     main
 };
