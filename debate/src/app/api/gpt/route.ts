import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is in an environment variable
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;

    // Check for valid input
    if (typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Invalid input text' });
    }

    try {
      // Prepend a prompt to the user's input text
      const prompt = `Respond to the following input: "${text}"`;
      
      // Send a request to OpenAI's GPT model
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      });

      const gptResponse = completion.data.choices[0]?.text?.trim() || 'No response';

      res.status(200).json({ response: gptResponse });
    } catch (error) {
      console.error('Error generating completion:', error);
      res.status(500).json({ error: 'Failed to generate completion' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}