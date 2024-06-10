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
                const { email, password } = req.body;

                const user = await User.findOne({ email });
                if (!user) {
                    console.log('User not found');
                    return res.status(400).json({ error: 'Неверный email или пароль' });
                }

                console.log('User from DB:', user);
                console.log('Password to compare:', password);

                const isMatch = await argon2.verify(user.password, password);
                console.log('Password comparison result:', isMatch);
                console.log('User password:', user.password);
                console.log('Provided password:', password);

                if (!isMatch) {
                    console.log('Passwords do not match');
                    return res.status(400).json({ error: 'Неверный email или пароль' });
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ token });
            } catch (error) {
                console.error('Error in login:', error);
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
