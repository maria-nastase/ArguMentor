import { useAppState } from "./AppStateContext";

export default function ResponseLog(){
    const {response} = useAppState();
    return <>{response}</>;
}