// pages/api/auth/login.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                const isMatch = await argon2.verify(user.password, password);
                if (!isMatch) {
                    return res.status(400).json({ error: 'Invalid email or password' });
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
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

