import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
import type { CulturalSpace } from "../../types/CulturalSpace";

type KakaoMapProps = {
  spaces: CulturalSpace[];
};

const KakaoMap = ({ spaces }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);

  useKakaoLoader(); // ✅ 공통 스크립트 로더 사용

  useEffect(() => {
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      // 지도 인스턴스 생성
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 6,
      });
      mapInstanceRef.current = map;

      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const bounds = new window.kakao.maps.LatLngBounds();
      const geocoder = new window.kakao.maps.services.Geocoder(); // ✅ 필수 위치

      let geocodeCount = 0;
      let successCount = 0;

      if (spaces.length === 0) {
        map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.978));
        return;
      }

      spaces.forEach((space) => {
        geocoder.addressSearch(space.ADDR, (result, status) => {
          geocodeCount += 1;

          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const coords = new window.kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            );

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
          } else {
            console.warn(`주소 변환 실패: ${space.ADDR}`);
          }

          // 모든 주소 처리 완료 후 bounds 적용
          if (geocodeCount === spaces.length) {
            if (successCount > 0) {
              map.setBounds(bounds);
            } else {
              map.setCenter(new window.kakao.maps.LatLng(37.5665, 126.978));
            }
          }
        });
      });
    });
  }, [spaces]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg shadow"
      style={{ minHeight: "400px" }}
    />
  );
};

export default KakaoMap;
