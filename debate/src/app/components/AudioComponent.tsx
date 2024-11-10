"use client"; // Ensure this is at the top

import { useState } from 'react';

const AudioComponent = () => {
  const [audioURL, setAudioURL] = useState('/audio/speech.mp3'); // Default audio URL

  const deleteAudio = async () => {
    try {
      // Make the DELETE request to delete the audio file
      const response = await fetch('/api/delete-audio', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: 'speech.mp3' }), // Specify the file name or path
      });

      if (response.ok) {
        console.log('Audio deleted successfully');
        // Instead of setting it to `null`, refresh the audioURL to ensure it's updated
        setAudioURL('/audio/speech.mp3?' + new Date().getTime()); // Force URL update to avoid cached version
      } else {
        const errorData = await response.json();
        console.error('Failed to delete audio:', errorData.error);
      }
    } catch (error) {
      console.error('Error calling delete API:', error);
    }
  };

  return (
    <div>
      {audioURL ? (
        <div className="relative">
          <audio controls src={audioURL}>
            Your browser does not support the audio element.
          </audio>
          <button
            onClick={deleteAudio}
            className="absolute top-0 right-0 text-red-500 font-bold text-xl"
          >
            X
          </button>
        </div>
      ) : (
        <p>No audio available</p> // Optional fallback if no audio file is available
      )}
    </div>
  );
};

export default AudioComponent;
