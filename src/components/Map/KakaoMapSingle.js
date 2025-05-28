import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
const KakaoMapSingle = ({ address, name, }) => {
    const mapRef = useRef(null);
    useKakaoLoader();
    useEffect(() => {
        var _a;
        if (!((_a = window.kakao) === null || _a === void 0 ? void 0 : _a.maps))
            return;
        window.kakao.maps.load(() => {
            if (!mapRef.current)
                return;
            const map = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.978),
                level: 5,
            });
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result[0]) {
                    const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
                    const marker = new window.kakao.maps.Marker({
                        map,
                        position: coords,
                    });
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">${name}</div>`,
                    });
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                }
            });
        });
    }, [address, name]);
    return _jsx("div", { ref: mapRef, className: "w-full h-[400px] rounded-lg shadow" });
};
export default KakaoMapSingle;
