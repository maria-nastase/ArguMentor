import { useAppState } from "./AppStateContext";
import GPTInput from "./GPTInput";
import SpeechBubble from "./SpeechBubble";

export default function ResponseLog(){
    const {history, isLoading, score, suggestion} = useAppState();

    return <div className="flex-1 flex-col w-full flex justify-center items-center pr-3">
    {history.map((pr,i) => <SpeechBubble key={i} arr={pr} index={i}></SpeechBubble>)}
    <div className="mt-60">{isLoading ? "thinking...": "" }</div>
    <div className="flex flex-row-reverse w-full"><GPTInput></GPTInput></div>
    <div style={{ backgroundColor: '#afc3fe', color: '#41444', margin: '10px'}} className="bg-opacity-50 text-white p-3 rounded-md"><b>Score:</b> {score}</div>
    <div style={{ backgroundColor: '#afc3fe', color: '#41444', margin: '10px'}} className="bg-opacity-50 text-white p-3 rounded-md"><b> Suggestions:</b> {suggestion}</div>

    </div>;
}