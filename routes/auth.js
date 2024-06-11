const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email уже используется' });
        }

        // Хэширование пароля перед сохранением
        const hashedPassword = await argon2.hash(password);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
});

// Вход
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при входе пользователя' });
    }
});

// Восстановление пароля
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Пользователь не найден' });
        }

        // Генерация токена для сброса пароля
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Отправка токена на email пользователя
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        const message = `Вы запросили сброс пароля. Перейдите по следующей ссылке для сброса пароля: \n\n ${resetUrl}`;

        await sendEmail(user.email, 'Сброс пароля', message);

        res.status(200).json({ message: 'Токен для сброса пароля отправлен на почту' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при восстановлении пароля' });
    }
});

module.exports = router;
