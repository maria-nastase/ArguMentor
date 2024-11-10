import { useState } from "react";
import { FaChevronUp,  FaChevronDown} from 'react-icons/fa';

export default function SpeechBubble({arr, index}){

    const [showSugg, setShowSug] = useState<boolean>(false);

    function handleClick(){
        setShowSug(c => !c);
    }

    const classN = "flex w-full "+ (arr.isUser ? "flex-row-reverse mt-[10em] relative" : "flex-row")
    const classNN = "mt-6 max-w-[75%] " + (arr.isUser ? "bg-red-500":"bg-blue-500");
    const classArrow = "absolute -bottom-4 right-8";

    return <div key={index} className={classN}>
        <div className={classNN}>{arr.text} 
        {showSugg ? <div className="bg-green-900"><span className="font-bold">Suggestion: </span>{arr.suggestion}</div> : ""}
        {showSugg ? <FaChevronUp onClick={handleClick} className={classArrow}></FaChevronUp>:<FaChevronDown onClick={handleClick} className={classArrow}></FaChevronDown>}
        {arr.isUser ? <div className="bg-orange-500 absolute -bottom-2 -right-2">{arr.score < 0 ? "..." : arr.score}</div> : ""}</div>
    </div>;
}