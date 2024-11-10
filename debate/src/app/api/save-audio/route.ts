import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import * as path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert the blob to a buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    // Create a unique filename using timestamp
    const timestamp = Date.now();
    const filename = `speech.webm`;

    // Create the audio directory if it doesn't exist
    const audioDir = path.join(process.cwd(), 'public', 'recording');
    await mkdir(audioDir, { recursive: true });

    // Save the file
    const filePath = path.join(audioDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL path
    return NextResponse.json({
      message: 'File uploaded successfully',
      path: `/recording/${filename}`
    });

  } catch (error) {
    console.error('Error saving audio:', error);
    return NextResponse.json(
      { error: 'Failed to save audio file' },
      { status: 500 }
    );
  }
}
