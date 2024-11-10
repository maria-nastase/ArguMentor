export default function SpeechBubble({arr, index}){

    const classN = "flex w-full "+ (arr.isUser ? "flex-row-reverse mt-[10em]" : "flex-row")
    const classNN = "mt-6 max-w-[75%] " + (arr.isUser ? "bg-red-500":"bg-blue-500");

    return <div key={index} className={classN}>
        {arr.isUser ? <div className="bg-orange-500 relative -translate-x-1/2 translate-y-1/2 ">{arr.score < 0 ? "..." : arr.score}</div> : ""}
        <div className={classNN}>{arr.text}</div>
    </div>;
}