import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
const KakaoMap = ({ spaces }) => {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const mapInstanceRef = useRef(null);
    const geocoderRef = useRef(null);
    useKakaoLoader();
    useEffect(() => {
        var _a;
        if (!((_a = window.kakao) === null || _a === void 0 ? void 0 : _a.maps))
            return;
        window.kakao.maps.load(() => {
            if (!mapRef.current)
                return;
            // 지도 인스턴스 생성 또는 재사용
            if (!mapInstanceRef.current) {
                mapInstanceRef.current = new window.kakao.maps.Map(mapRef.current, {
                    center: new window.kakao.maps.LatLng(37.5665, 126.978),
                    level: 6,
                });
            }
            const map = mapInstanceRef.current;
            // 기존 마커 제거
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];
            // Geocoder 인스턴스 생성 또는 재사용
            if (!geocoderRef.current) {
                geocoderRef.current = new window.kakao.maps.services.Geocoder();
            }
            const geocoder = geocoderRef.current;
            // 마커 생성 및 지도 bounds 계산
            const bounds = new window.kakao.maps.LatLngBounds();
            let geocodeCount = 0;
            let successCount = 0;
            if (spaces.length === 0) {
                // 공간이 없으면 지도 중심만 초기화
                map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.978));
                return;
            }
            spaces.forEach((space) => {
                geocoder.addressSearch(space.ADDR, (result, status) => {
                    geocodeCount += 1;
                    if (status === window.kakao.maps.services.Status.OK && result[0]) {
                        const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
                        // 마커 생성
                        const marker = new window.kakao.maps.Marker({
                            map,
                            position: coords,
                        });
                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;font-size:12px;">${space.FAC_NAME}</div>`,
                        });
                        window.kakao.maps.event.addListener(marker, "mouseover", () => {
                            infowindow.open(map, marker);
                        });
                        window.kakao.maps.event.addListener(marker, "mouseout", () => {
                            infowindow.close();
                        });
                        markersRef.current.push(marker);
                        bounds.extend(coords);
                        successCount += 1;
                    }
                    else {
                        console.warn(`주소 변환 실패: ${space.ADDR}`);
                    }
                    // 모든 주소 변환이 끝난 후에만 bounds 적용
                    if (geocodeCount === spaces.length) {
                        if (successCount > 0) {
                            map.setBounds(bounds);
                        }
                        else {
                            // 모두 실패 시 서울 중심으로 이동
                            map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.978));
                        }
                    }
                });
            });
        });
    }, [spaces]);
    return _jsx("div", { ref: mapRef, className: "w-full h-[400px] rounded-lg shadow" });
};
export default KakaoMap;
