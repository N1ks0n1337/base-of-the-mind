import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import sendEmail from '../../../utils/sendEmail';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { email } = req.body;

                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ error: 'Пользователь не найден' });
                }

                const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

                // Создание ссылки для сброса пароля
                const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
                // Для продакшена
                // const resetUrl = `https://yourdomain.com/reset-password?token=${resetToken}`;
                const message = `Вы запросили сброс пароля. Перейдите по следующей ссылке для сброса пароля: \n\n ${resetUrl}`;

                // Отправка email с токеном сброса пароля
                await sendEmail(user.email, 'Сброс пароля', message);

                res.status(200).json({ message: 'Токен для сброса пароля отправлен на почту' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
