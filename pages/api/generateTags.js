// pages/api/generateTags.js

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const response = await openai.createCompletion({
            model: "gpt-4o",
            prompt: `Сгенерируй теги, для следующего текста. Все теги должны быть через запятую: ${text}`,
            max_tokens: 50,
        });

        const tags = response.data.choices[0].text.trim().split(',').map(tag => tag.trim());
        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





