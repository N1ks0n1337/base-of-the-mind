// pages/api/moderation.js

import dbConnect from '../../utils/dbConnect';
import File from '../../models/File';
import { verifyToken } from '../../utils/jwt';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).json({ error: 'No authorization header' });
                }
                const token = authHeader.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ error: 'No token provided' });
                }
                const decoded = verifyToken(token);
                if (!decoded) {
                    return res.status(401).json({ error: 'Invalid token' });
                }

                const { fileId, summary, tags, title } = req.body;

                // Найти файл по ID и обновить его данные
                const file = await File.findById(fileId);
                if (!file) {
                    return res.status(404).json({ error: 'File not found' });
                }

                // Обновить данные файла
                file.summary = summary;
                file.tags = tags;
                file.name = title;
                file.status = 'pending';  // Устанавливаем статус "на модерации"

                await file.save();

                res.status(200).json({ success: true, message: 'Файл отправлен на модерацию' });
            } catch (error) {
                console.error('Error in API route:', error);
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
