import { useAppState } from "./AppStateContext";

export default function GPTInput(){

    const {setInputText, setIsLoading, appendToLog, inputText, isLoading, setScore} =  useAppState();

    const handleChange = (event) => {
        setInputText(event.target.value);
      };
    
      const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText.trim() && !isLoading) {
          setIsLoading(true);
          appendToLog(inputText);
    
          try {
            const res = await fetch('/api/response', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });
    
            const data = await res.json();
            appendToLog(data.response);



            const scoreRes = await fetch('/api/score', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });
    
            const scoreData = await scoreRes.json();
            console.log('Score data:', scoreData);
            console.log('Setting score:', scoreData.score);
            setScore(scoreData.score);
            console.log('Setting score:', scoreData.score);



          } catch (error) {
            console.error('Error posting data:', error);
            appendToLog('There was an error processing your request.');
          } finally {
            setIsLoading(false);
          }
        }
      };

    return (
        <>
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something here"
            />
            <p>You typed: {inputText}</p>
        </>
    );
};