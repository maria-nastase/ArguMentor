import { useAppState } from "./AppStateContext";

export default function ResponseLog(){
    const {history, isLoading, score} = useAppState();

    return <>
    {history.map(({text, isUser},i) => <div className={isUser ? "bg-red-500" : "bg-blue-500"} key={i}>{text}</div>)}
    {isLoading ? <div>thinking...</div>: "" }
    <div className="bg-purple-500 bg-opacity-50 text-white p-4 rounded-md">score: {score}</div>

    </>;
}