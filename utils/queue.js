// utils/queue.js
import Queue from 'bull';
import { generateSummary, generateTags } from './openai';
import dbConnect from './dbConnect';
import File from '../models/File';

const fileProcessingQueue = new Queue('fileProcessing', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        retryStrategy: function (times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
        }
    }
});

fileProcessingQueue.on('error', (error) => {
    console.error('Error in fileProcessingQueue:', error);
});

fileProcessingQueue.process(async (job, done) => {
    try {
        const { filePath, originalname, userId } = job.data;
        console.log(`Processing job for file: ${filePath}`);

        await dbConnect();
        console.log('Connected to database');

        const summary = await generateSummary(filePath);
        console.log(`Generated summary: ${summary}`);

        const tags = await generateTags(filePath);
        console.log(`Generated tags: ${tags}`);

        const file = new File({
            name: originalname,
            path: filePath,
            summary,
            tags,
            uploadedAt: new Date(),
            user: userId,
        });

        await file.save();
        console.log('File saved to database');

        done(null, { summary, tags });
    } catch (error) {
        console.error('Error processing job:', error);
        done(new Error(error.message));
    }
});

fileProcessingQueue.on('completed', (job, result) => {
    console.log(`Job completed with result: ${JSON.stringify(result)}`);
});

fileProcessingQueue.on('failed', (job, err) => {
    console.log(`Job failed with error: ${err.message}`);
});

export default fileProcessingQueue;
