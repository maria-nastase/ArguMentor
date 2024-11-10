import { useState } from "react";
import { FaChevronUp,  FaChevronDown} from 'react-icons/fa';

export default function SpeechBubble({arr, index}){

    const [showSugg, setShowSug] = useState<boolean>(false);

    function handleClick(){
        setShowSug(c => !c);
    }

    const containerClasses = "flex w-full "+ (arr.isUser ? "flex-row-reverse relative" : "flex-row");
    const bubbleClasses = "rounded-md mt-6 max-w-[75%] p-3 text-white " + (arr.isUser ? "bg-orange-450" : "bg-blue-500");
    const classArrow = "absolute -bottom-5 right-10 p-1 bg-blue-900";

    return <div key={index} className={containerClasses}>
        <div className={bubbleClasses}>{arr.text} 
        {showSugg ? <div className="bg-opacity-50 text-white p-3 rounded-md bg-green-900"><span className="font-bold">Suggestion: </span>{arr.suggestion}</div> : ""}
        {arr.isUser ? <div onClick={handleClick} className={`${classArrow} className="text-white p-3 rounded-md`}>{showSugg ? <FaChevronUp></FaChevronUp>:<FaChevronDown></FaChevronDown>}</div> : ""}
        {arr.isUser ? <div className="text-white p-3 rounded-md bg-orange-500 absolute p-1 -bottom-7 -right-2">{arr.score < 0 ? "..." : arr.score}</div> : ""}</div>
    </div>;
}