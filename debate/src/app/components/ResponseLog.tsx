import { useAppState } from "./AppStateContext";
import GPTInput from "./GPTInput";
import SpeechBubble from "./SpeechBubble";

export default function ResponseLog(){
    const {history, isLoading, score, suggestion} = useAppState();

    return <div className="flex-1 flex-col w-full flex justify-center items-center pr-3">
    {history.map((pr,i) => <SpeechBubble key={i} arr={pr} index={i}></SpeechBubble>)}
    <div className="mt-40 ml-20">{isLoading ? "Thinking...": "" }</div>
    <div className="flex flex-row-reverse w-full"><GPTInput></GPTInput></div>
    <div className="text-white p-3 rounded-md bg-black"><b>Score:</b> {score}</div>
    <div style={{ backgroundColor: 'rgba(175, 195, 254, 0.95)', margin: '10px'}} className="text-white p-3 rounded-md"><b> Suggestions:</b> {suggestion}</div>

    </div>;
}