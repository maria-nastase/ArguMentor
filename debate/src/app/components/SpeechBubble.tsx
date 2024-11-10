import { useState } from "react";
import { FaChevronUp,  FaChevronDown} from 'react-icons/fa';

export default function SpeechBubble({arr, index}){

    const [showSugg, setShowSug] = useState<boolean>(false);

    function handleClick(){
        setShowSug(c => !c);
    }

    const containerClasses = "flex w-full "+ (arr.isUser ? "flex-row-reverse mt-[10em] relative" : "flex-row")
    const bubbleClasses = " rounded-md p-1 mt-6 max-w-[75%] " + (arr.isUser ? "bg-red-500":"bg-blue-500");
    const classArrow = "absolute -bottom-5 right-10 p-1 bg-blue-900";

    return <div key={index} className={containerClasses}>
        <div className={bubbleClasses}>{arr.text} 
        {showSugg ? <div className="bg-green-900"><span className="font-bold">Suggestion: </span>{arr.suggestion}</div> : ""}
        {arr.isUser ? <div onClick={handleClick} className={classArrow}>{showSugg ? <FaChevronUp></FaChevronUp>:<FaChevronDown></FaChevronDown>}</div> : ""}
        {arr.isUser ? <div className="bg-orange-500 absolute p-1 -bottom-7 -right-2">{arr.score < 0 ? "..." : arr.score}</div> : ""}</div>
    </div>;
}