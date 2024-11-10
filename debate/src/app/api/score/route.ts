import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const openai = new OpenAI(); //just magically uses OPENAI_API_KEY variable, seemingly even if you pass an apiKey option with a different variable


let conversationHistory = [];

export async function POST(req) {

  try {
    const { text } = await req.json();

    conversationHistory.push({ role: 'user', content: `Evaluate the following debate argument and assign it a numerical score out of 10. This is part of a machine learning API, so additional text or explanations should be included, ONLY numerical answer out of 10 and show that it is out of 10.

Argument: "${text}"` });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
    });

    const assistantResponse = completion.choices[0].message.content;

    // Add the assistant's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantResponse });

    return NextResponse.json({ score: assistantResponse });
  } catch (error) {
    console.error("Error scoring text:", error);
    return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
  }
}
