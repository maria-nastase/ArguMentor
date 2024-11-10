import { useAppState } from "./AppStateContext";

export default function GPTInput(){

    const {setInputText, setIsLoading, setResponse, inputText, isLoading} =  useAppState();

    const handleChange = (event) => {
        setInputText(event.target.value);
      };
    
      const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText.trim() && !isLoading) {
          setIsLoading(true);
          setResponse(null);
    
          try {
            const res = await fetch('/api/response', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: inputText }),
            });
    
            const data = await res.json();
            setResponse(data.response);
          } catch (error) {
            console.error('Error posting data:', error);
            setResponse('There was an error processing your request.');
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