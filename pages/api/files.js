// pages/api/files.js

import dbConnect from '../../utils/dbConnect';
import File from '../../models/File';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const files = await File.find().populate('user');
                res.status(200).json({ success: true, files });
            } catch (error) {
                console.error('Error fetching files:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
