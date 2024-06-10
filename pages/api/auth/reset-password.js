import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { token, password } = req.body;
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(400).json({ error: 'Неверный токен или пользователь не найден' });
                }

                user.password = await argon2.hash(password);
                await user.save();

                res.status(200).json({ message: 'Пароль успешно сброшен' });
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
