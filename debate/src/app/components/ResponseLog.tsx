import { useAppState } from "./AppStateContext";

export default function ResponseLog(){
    const {history, isLoading} = useAppState();

    return <>
    {history.map((t,i) => <div key={i}>{t}</div>)}
    {isLoading ? <div>thinking...</div>: "" }

    </>;
}