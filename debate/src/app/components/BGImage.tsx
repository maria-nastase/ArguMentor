import { useAppState } from "./AppStateContext";
import SVGEmbed from "./SVGEmbed.svg"
import SvgIcon from "./SvgIcon";

export default function BGImage() {
    const {isLoading, isTyping} = useAppState();
    return <div className="absolute bottom-0 w-full -z-50">
        <SvgIcon leftSpeakerAnim={isLoading} rightSpeakerAnim={isTyping}></SvgIcon>
    </div>;
}