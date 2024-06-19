// utils/openai.js

import { OpenAI } from 'openai';
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const extractTextFromFile = async (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const extension = filePath.split('.').pop();

    let text = '';

    if (extension === 'pdf') {
        const data = await pdf(fileBuffer);
        text = data.text;
    } else if (extension === 'docx') {
        const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
        text = value;
    } else if (extension === 'txt' || extension === 'csv') {
        text = fileBuffer.toString();
    }

    return text;
};

const generateSummary = async (filePath) => {
    const text = await extractTextFromFile(filePath);

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: `Сгенерируй саммари для всего текста дальше: ${text}` }],
        max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
};

const generateTags = async (filePath) => {
    const text = await extractTextFromFile(filePath);

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: `Сгенерируй теги, для следующего текста. Все теги должны быть через запятую: ${text}` }],
        max_tokens: 50,
    });

    return response.choices[0].message.content.trim().split(',').map(tag => tag.trim());
};

export { generateSummary, generateTags };
