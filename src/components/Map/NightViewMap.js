import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
const NightViewMap = ({ spots }) => {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const mapInstanceRef = useRef(null);
    useKakaoLoader();
    useEffect(() => {
        var _a;
        if (!((_a = window.kakao) === null || _a === void 0 ? void 0 : _a.maps))
            return;
        window.kakao.maps.load(() => {
            if (!mapRef.current)
                return;
            // 기존 마커 제거
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];
            const map = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.978),
                level: 6,
            });
            mapInstanceRef.current = map;
            const bounds = new window.kakao.maps.LatLngBounds();
            spots.forEach((spot) => {
                try {
                    const lat = parseFloat(spot.LA);
                    const lng = parseFloat(spot.LO);
                    if (isNaN(lat) || isNaN(lng))
                        return;
                    const position = new window.kakao.maps.LatLng(lat, lng);
                    bounds.extend(position);
                    const marker = new window.kakao.maps.Marker({
                        map,
                        position,
                    });
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">${spot.TITLE}</div>`,
                    });
                    window.kakao.maps.event.addListener(marker, "mouseover", () => {
                        infowindow.open(map, marker);
                    });
                    window.kakao.maps.event.addListener(marker, "mouseout", () => {
                        infowindow.close();
                    });
                    markersRef.current.push(marker);
                }
                catch (error) {
                    console.error("마커 생성 실패:", spot.TITLE, error);
                }
            });
            if (markersRef.current.length > 0) {
                map.setBounds(bounds);
            }
        });
    }, [spots]);
    return (_jsx("div", { ref: mapRef, className: "w-full h-[400px] rounded-lg shadow", style: { minHeight: "400px" } }));
};
export default NightViewMap;
