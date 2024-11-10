import { useEffect, useRef, useState } from "react";
import { useAppState } from "./AppStateContext";
import AudioRecorder from "./AudioRecorder";
import AudioPlayer from "./AudioPlayer";
import AudioComponent from "./AudioComponent";

export default function GPTInput(){
    const [audioURL, setAudioURL] = useState('/audio/speech.mp3');
    const audioRef = useRef(null); // Reference to hold the audio element
    const audioUrlRef = useRef(null); // Reference to hold the current audio URL

    const {setInputText, setIsLoading, appendToLog, addScoreToLog, inputText, isLoading, setScore, setSuggestions, setIsTyping} =  useAppState();

    const updateAudioURL = (newURL) => {
      setAudioURL(newURL); // Update the audio URL to play the new file
    };

    const [isRecentlyChanged, setIsRecentlyChanged] = useState(false);

    useEffect(() => {
        setIsTyping(isRecentlyChanged);
      }, [isRecentlyChanged]);
  
    useEffect(() => {
      if (!isRecentlyChanged) return;
  
      // Set a timer to reset the "isRecentlyChanged" state to false after 0.5 seconds
      const timer = setTimeout(() => {
        setIsRecentlyChanged(false);
      }, 500);
  
      // Clear the timer if the component re-renders or the effect is re-triggered
      return () => clearTimeout(timer);
    }, [isRecentlyChanged, inputText]);

    const handleChange = (event) => {
        setInputText(event.target.value);
        setIsRecentlyChanged(true); // set to true on every change
      };
    
      const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText.trim() && !isLoading) {
          setIsLoading(true);
          appendToLog(inputText, true);
    
          try {
            const res = fetch('/api/response', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });



            const scoreRes = fetch('/api/score', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });

            const suggestionsRes = fetch('/api/suggestions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });

            setInputText(''); // Clear the input field
            const [suggestionsData, scoreData, data] = await Promise.all([suggestionsRes.then(r => r.json()), scoreRes.then(r => r.json()), res.then(r => r.json())]);

            const readData = {
              text: data.response,
              score: scoreData.score,
              suggestion: suggestionsData.suggestion
            };

            const sRes = fetch('/api/text-to-speech', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: `${data.response}\nScore: ${scoreData.score}\n${suggestionsData.suggestion}` }),
            });

            addScoreToLog(suggestionsData.suggestion, scoreData.score);
            appendToLog(data.response, false, "", 0);
            setScore(scoreData.score);
            setSuggestions(suggestionsData.suggestion);


            const audioBlob = await sRes.then(r => r.blob());
                    // Revoke the previous audio URL if it exists
          if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
          }
            const audioUrl = URL.createObjectURL(audioBlob);
            if (audioRef.current) {
              audioRef.current.pause(); // Pause the currently playing audio if any
              audioRef.current.currentTime = 0; // Reset playback position
            }
    
            // Create a new audio element and play the new audio
            const newAudio = new Audio(audioUrl);
            newAudio.play();
    
            // Save the new audio element to the ref
            audioRef.current = newAudio;
            audioUrlRef.current = audioUrl; 

          } catch (error) {
            console.error('Error posting data:', error);
            appendToLog('There was an error processing your request.', false, "", 0.0);
          } finally {
            setIsLoading(false);
          }
        }
      };

    return (
        <>  
            <textarea
                style={{ backgroundColor: '#c65547', overflow: 'hidden', marginTop: '10px', marginBottom: '20px' }}
                className="w-3/4 text-white border-none placeholder-white focus:outline-none p-3 rounded-md"
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something here"
            />
            
          
        
        </>

    );
};