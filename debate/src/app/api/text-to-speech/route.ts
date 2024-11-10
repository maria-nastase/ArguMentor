import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    

  try {
    // Generate audio using OpenAI
    const speech = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: body.text,
    });    

    // Define the file path
    const speechFilePath = path.join(process.cwd(), 'public', 'audio', 'speech.mp3');
    const buffer = Buffer.from(await speech.arrayBuffer());

    // Ensure directory exists
    await fs.promises.mkdir(path.dirname(speechFilePath), { recursive: true });
    await fs.promises.writeFile(speechFilePath, buffer);

    // Respond with success and file path
    return NextResponse.json({ message: 'Audio file created successfully', filePath: '/audio/speech.mp3' });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json({ error: 'Failed to generate audio.' }, { status: 500 });
  }
}
