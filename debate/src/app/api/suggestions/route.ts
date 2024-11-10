import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const openai = new OpenAI();


let conversationHistory = [];

export async function POST(req) {

  try {
    const { text } = await req.json();

    conversationHistory.push({ role: 'user', content: `Give suggestions for this debate argument. Do not include a numerical score. Write your answer in paragraph form and do not use bullet points or numbers. Make the feedback 3-4 sentences max "${text}"` });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
    });

    const assistantResponse = completion.choices[0].message.content;

    // Add the assistant's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantResponse });

    return NextResponse.json({ suggestion: assistantResponse });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
  }
}
