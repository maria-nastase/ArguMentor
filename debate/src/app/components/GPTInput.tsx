import { useAppState } from "./AppStateContext";

export default function GPTInput(){

    const {setInputText, setIsLoading, appendToLog, inputText, isLoading, setScore} =  useAppState();

    const handleChange = (event) => {
        setInputText(event.target.value);
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
    
            const [scoreData, data] = await Promise.all([scoreRes.then(r => r.json()), res.then(r => r.json())]);
            appendToLog(data.response);
            console.log('Score data:', scoreData);
            console.log('Setting score:', scoreData.score);
            setScore(scoreData.score);
            console.log('Setting score:', scoreData.score);



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