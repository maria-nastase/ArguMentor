import SVGEmbed from "./SVGEmbed.svg"
import SvgIcon from "./SvgIcon";

export default function BGImage() {
    return <div   style={{
        backgroundColor: 'lightpink',
        resize: 'horizontal',
        overflow: 'hidden',
        width: '10000px',
        height: 'auto',
      }} id="stageContainer">
        <SvgIcon></SvgIcon>
    </div>;
}