import { useEffect, useRef } from "react";
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

const NightViewMap = ({ spots }: NightViewMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const scriptId = "kakao-map-sdk";
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null); // 추가: 맵 인스턴스 추적

  useEffect(() => {
    const loadMap = () => {
      if (!window.kakao?.maps) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
          import.meta.env.VITE_KAKAO_MAP_API_KEY
        }&autoload=false`;
        script.async = true;

        script.onload = () => {
          window.kakao.maps.load(initializeMap);
        };
        script.onerror = () => {
          console.error("카카오 맵 스크립트 로드 실패");
        };

        document.head.appendChild(script);
      } else {
        window.kakao.maps.load(initializeMap);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      try {
        // 맵 인스턴스 생성 및 저장
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 6,
        });
        mapInstanceRef.current = map;

        // 새 마커 생성
        const bounds = new window.kakao.maps.LatLngBounds(); // 추가: 지도 범위 조정

        spots.forEach((spot) => {
          try {
            const lat = parseFloat(spot.LA);
            const lng = parseFloat(spot.LO);
            if (isNaN(lat) || isNaN(lng)) return;

            const position = new window.kakao.maps.LatLng(lat, lng);
            bounds.extend(position); // 추가: 범위에 위치 포함

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
          } catch (error) {
            console.error("마커 생성 실패:", spot.TITLE, error);
          }
        });

        // 지도 범위 조정 (마커가 있는 경우만)
        if (markersRef.current.length > 0) {
          map.setBounds(bounds);
        }
      } catch (error) {
        console.error("맵 초기화 실패:", error);
      }
    };

    loadMap();

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, [spots]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg shadow"
      style={{ minHeight: "400px" }}
    />
  );
};

export default NightViewMap;
