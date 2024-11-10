import { useEffect, useState } from 'react';

const AudioPlayer = () => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if the file exists
        const response = await fetch('/audio/speech.mp3');
        if(response.status === 304) {
            console.log("not modified");
            return;
        }
        
        if (response.ok) {
          // If there's no audio instance or it's different from the current one, play the new audio
          if (!audio || audio.src !== '/audio/speech.mp3') {
            if (!audio?.paused) {
            console.log("pausing audio", audio);
              audio.pause(); // Pause the previous audio
            }

            const newAudio = new Audio('/audio/speech.mp3');
            newAudio.loop = false;  // Make sure the audio plays in a loop
            newAudio.addEventListener('canplay', () => newAudio.play()); // Play the audio when it's ready
            console.log("bingo");
            setAudio(newAudio); // Store the new audio object to prevent multiple instances
          }
        }
      } catch (error) {
        console.log("Audio file not found yetttttt:", error);
      }
    }, 1000); // Check every second

    // Clean up the interval on component unmount
    return () => {
      if (!audio?.paused) {
        audio.pause(); // Ensure the audio is paused when the component unmounts
      }
      clearInterval(interval);
    };
  }, []); // The effect will trigger when the `audio` object is updated

  return null; // No UI needed for this component
};

export default AudioPlayer;
