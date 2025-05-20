import { NightViewSpot } from "../../types/NightViewSpot";
declare global {
    interface Window {
        kakao: {
            maps: typeof kakao.maps;
        };
    }
}
interface NightViewMapProps {
    spots: NightViewSpot[];
}
declare const NightViewMap: ({ spots }: NightViewMapProps) => import("react/jsx-runtime").JSX.Element;
export default NightViewMap;
