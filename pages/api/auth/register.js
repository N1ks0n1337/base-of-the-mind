import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import argon2 from 'argon2';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name, email, password } = req.body;

                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'Email уже используется' });
                }

                const hashedPassword = await argon2.hash(password);
                console.log('Generated hashed password:', hashedPassword);
                const user = new User({ name, email, password: hashedPassword });
                await user.save();
                res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
            } catch (error) {
                console.error('Ошибка при регистрации пользователя:', error);
                res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
