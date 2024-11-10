import { useEffect, useState } from "react";
import { useAppState } from "./AppStateContext";

export default function GPTInput(){

    const {setInputText, setIsLoading, appendToLog, inputText, isLoading, setScore, setSuggestions} =  useAppState();

    const [isRecentlyChanged, setIsRecentlyChanged] = useState(false);
  
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
            console.log(suggestionsData.suggestion);
            appendToLog(data.response);
            setScore(scoreData.score);
            setSuggestions(suggestionsData.suggestion);


          } catch (error) {
            console.error('Error posting data:', error);
            appendToLog('There was an error processing your request.', false);
          } finally {
            setIsLoading(false);
          }
        }
      };

    return (
        <>
            <input 
                style={{ backgroundColor: '#FA9746' }}
                className="text-white border-none placeholder-white focus:outline-none p-3 rounded-md"
                type="text"
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something here"
            />
        </>
    );
};