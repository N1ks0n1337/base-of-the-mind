// pages/api/upload.js
import dbConnect from '../../utils/dbConnect';
import File from '../../models/File';
import { generateSummary, generateTags } from '../../utils/openai';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), '/uploads');

        // Создаем директорию, если она не существует
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const form = formidable({ 
            uploadDir, 
            keepExtensions: true 
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Formidable error:', err);
                return res.status(500).json({ error: 'Ошибка при загрузке файла' });
            }

            // Логирование для отладки
            console.log('Fields:', fields);
            console.log('Files:', files);

            // Проверка существования файла
            if (!files.file) {
                return res.status(400).json({ error: 'Файл не найден' });
            }

            const { originalFilename, newFilename, filepath, size } = files.file[0];

            // Проверка существования полей
            if (!originalFilename || !filepath) {
                return res.status(400).json({ error: 'Недопустимое имя файла или путь' });
            }

            const userId = fields.userId[0]; // Извлекаем userId из массива
            if (!userId || userId === 'null') {
                return res.status(400).json({ error: 'userId не указан' });
            }

            const fileFormat = path.extname(originalFilename).substring(1);

            try {
                const summary = await generateSummary(filepath);
                const tags = await generateTags(filepath);

                const file = new File({
                    name: originalFilename,
                    format: fileFormat,
                    uploadDate: new Date(),
                    size: size,
                    user: userId,
                    summary: summary,
                    tags: tags,
                    status: 'pending',
                });

                await file.save();

                return res.status(200).json({ summary, tags, title: originalFilename });
            } catch (error) {
                console.error('Error during file processing:', error);
                return res.status(500).json({ error: 'Ошибка при обработке файла' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
