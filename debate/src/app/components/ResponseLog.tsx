import { useAppState } from "./AppStateContext";
import GPTInput from "./GPTInput";
import SpeechBubble from "./SpeechBubble";

export default function ResponseLog(){
    const {history, isLoading, score, suggestion} = useAppState();

    return <div className="flex-1 flex-col w-full overflow-scroll flex justify-center items-center pr-3">
    {history.map((pr,i) => <SpeechBubble arr={pr} index={i}></SpeechBubble>)}
    {isLoading ? <div>thinking...</div>: "" }
    <div className="flex flex-row-reverse w-full"><GPTInput></GPTInput></div>
    <div style={{ backgroundColor: '#c6d5ff', color: '#41444'}} className="bg-opacity-50 text-white p-3 rounded-md">Score: {score}</div>
    <div> Suggestions: {suggestion}</div>

    </div>;
}