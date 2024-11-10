import fs from 'fs';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(req) {
    const { filePath } = await req.json(); // Read JSON body

    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: 'whisper-1',
        });

        console.log('from speech-to-text',transcription.text);
        return NextResponse.json({ transcription: transcription.text }, { status: 200 });
    } catch (error) {
        console.error("Error transcribing audio:", error);
        return NextResponse.json({ error: 'Failed to transcribe audio.' }, { status: 500 });
    }
}
