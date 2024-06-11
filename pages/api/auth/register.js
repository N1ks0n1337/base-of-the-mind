// pages/api/auth/register.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import argon2 from 'argon2';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name, email, password } = req.body;
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'Email already in use' });
                }
                const user = new User({ name, email, password});
                await user.save();

                res.status(201).json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email } });
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
