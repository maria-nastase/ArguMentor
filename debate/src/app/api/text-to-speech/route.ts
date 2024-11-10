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

    const buffer = Buffer.from(await speech.arrayBuffer());  // Create a buffer from the audio data

    // Respond with the MP3 data directly in the response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mp3',  // Specify the content type as MP3
        'Content-Length': buffer.length, // Specify the length of the content
      },
    });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json({ error: 'Failed to generate audio.' }, { status: 500 });
  }
}
