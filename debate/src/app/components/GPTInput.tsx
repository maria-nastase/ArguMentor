import { useEffect, useState } from "react";
import { useAppState } from "./AppStateContext";
import AudioRecorder from "./AudioRecorder";

export default function GPTInput(){

    const {setInputText, setIsLoading, appendToLog, addScoreToLog, inputText, isLoading, setScore, setSuggestions, setIsTyping} =  useAppState();

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
              body: JSON.stringify({ text: readData }),
            });

            addScoreToLog(suggestionsData.suggestion, scoreData.score);
            appendToLog(data.response, false, "", 0);
            setScore(scoreData.score);
            setSuggestions(suggestionsData.suggestion);


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
            <input 
                style={{ backgroundColor: '#FA9746' }}
                className="w-1/2 text-white border-none placeholder-white focus:outline-none p-3 rounded-md"
                type="text"
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something here"
            />
            
          <div className="button">
            <AudioRecorder />
            </div>
        </>
    );
};