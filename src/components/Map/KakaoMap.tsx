// src/components/Map/KakaoMap.tsx
import { useEffect, useRef } from "react";
import { useKakaoLoader } from "../../hooks/useKakaoLoader.ts";
import type { CulturalSpace } from "../../types/CulturalSpace"; // 타입 불러오기

// props 타입 정의
type KakaoMapProps = {
  spaces: CulturalSpace[];
};

const KakaoMap = ({ spaces }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useKakaoLoader();

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
        level: 6,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 문화공간 마커 추가
      spaces.forEach((space) => {
        // 주소를 좌표로 변환하기 위한 geocoder
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표 검색
        geocoder.addressSearch(space.ADDR, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            );

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우 생성
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${space.FAC_NAME}</div>`,
            });

            // 마커 클릭 시 인포윈도우 표시
            window.kakao.maps.event.addListener(marker, "click", () => {
              infowindow.open(map, marker);
            });
          }
        });
      });
    }
  }, [spaces]); // spaces가 변경될 때마다 마커 업데이트

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow" />;
};

export default KakaoMap;
