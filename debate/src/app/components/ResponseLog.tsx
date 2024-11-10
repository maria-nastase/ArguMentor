import { useAppState } from "./AppStateContext";

export default function ResponseLog(){
    const {history, isLoading, score, suggestion} = useAppState();

    return <>
    {history.map(({text, isUser},i) => <div className={isUser ? "bg-red-500" : "bg-blue-500"} key={i}>{text}</div>)}
    {isLoading ? <div>thinking...</div>: "" }
    <div style={{ backgroundColor: '#c6d5ff', color: '#41444'}} className="bg-opacity-50 text-white p-3 rounded-md">Score: {score}</div>
    <div>Suggestions: {suggestion}</div>

    </>;
}