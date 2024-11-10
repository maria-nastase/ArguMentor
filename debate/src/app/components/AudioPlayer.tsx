import { useEffect, useState } from 'react';

const AudioPlayer = () => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if the file exists
        const response = await fetch('/audio/speech.mp3');
        
        if (response.ok && !audioPlayed) {
          const audio = new Audio('/audio/speech.mp3');
          audio.play();
          setAudioPlayed(true);
        }
      } catch (error) {
        console.log("Audio file not found yet:", error);
      }
    }, 1000); // Check every second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [audioPlayed]);

  return null; // No UI needed for this component
};

export default AudioPlayer;