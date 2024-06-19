// pages/api/upload.js
import multer from 'multer';
import { createRouter } from 'next-connect';
import dbConnect from '../../utils/dbConnect';
import fileProcessingQueue from '../../utils/queue';
import { verifyToken } from '../../utils/jwt';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }),
});

const apiRoute = createRouter({
    onError(error, req, res) {
        console.error(error.stack);
        res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' not allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
    try {
        await dbConnect();
        const authHeader = req.headers.authorization;
        console.log('Authorization header:', authHeader);
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
        const userId = decoded.id;

        const { originalname, path: filePath } = req.file;
        const fullFilePath = path.join(process.cwd(), 'public/uploads', filePath);

        console.log(`File uploaded: ${fullFilePath}`);

        // Добавление задачи в очередь
        const job = await fileProcessingQueue.add({ filePath: fullFilePath, originalname, userId });
        console.log(`Job added to queue: ${job.id}`);

        // Ожидание завершения задачи
        job.finished().then(result => {
            console.log(`Job finished with result: ${JSON.stringify(result)}`);
            res.status(200).json({
                success: true,
                message: 'File uploaded and processing started',
                summary: result.summary,
                tags: result.tags,
                title: originalname,
                fileId: job.id
            });
        }).catch(error => {
            console.error('Error finishing job:', error);
            res.status(500).json({ error: error.message });
        });

    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).json({ error: error.message });
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apiRoute.handler();
