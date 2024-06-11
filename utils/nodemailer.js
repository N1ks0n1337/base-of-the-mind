const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false, // true для портов 465 и false для портов 587 и 25
    auth: {
        user: process.env.EMAIL_USER, // Ваш email в Yandex
        pass: process.env.EMAIL_PASS  // Ваш пароль приложения
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;