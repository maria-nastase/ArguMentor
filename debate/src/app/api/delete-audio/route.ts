import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import * as path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'audio', 'speech.mp3');
    
    // Attempt to delete the file
    await unlink(filePath);
    console.log('Audio file deleted successfully');

    return NextResponse.json({ message: 'Audio file deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting audio file:', error);
    return NextResponse.json({ error: 'Failed to delete audio file' }, { status: 500 });
  }
}
