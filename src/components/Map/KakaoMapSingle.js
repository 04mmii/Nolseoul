import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
const KakaoMapSingle = ({ name, address, lat, lng }) => {
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
                center: new window.kakao.maps.LatLng(37.5665, 126.978), // fallback
                level: 4,
            });
            const showMarker = (position) => {
                const marker = new window.kakao.maps.Marker({
                    position,
                    map,
                });
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;font-size:12px;">${name}</div>`,
                });
                infowindow.open(map, marker);
                setTimeout(() => {
                    map.relayout();
                    map.setCenter(position);
                }, 100);
            };
            if (lat && lng) {
                const position = new window.kakao.maps.LatLng(lat, lng);
                showMarker(position);
            }
            else if (address) {
                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(address, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK && result[0]) {
                        const position = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
                        showMarker(position);
                    }
                    else {
                        console.warn("❗ 주소로 위치를 찾을 수 없습니다:", address);
                    }
                });
            }
        });
    }, [lat, lng, address, name]);
    return _jsx("div", { ref: mapRef, className: "w-full h-[400px] rounded-lg shadow" });
};
export default KakaoMapSingle;
