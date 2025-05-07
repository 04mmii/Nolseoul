import { useEffect, useRef } from "react";
import { NightViewSpot } from "../../types/NightViewSpot";

interface NightViewMapProps {
  spots: NightViewSpot[];
}

const NightViewMap = ({ spots }: NightViewMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 6,
      };
      const map = new window.kakao.maps.Map(container, options);

      spots.forEach((spot) => {
        if (!spot.LA || !spot.LO) return;
        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(
            Number(spot.LA),
            Number(spot.LO)
          ),
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
      });
    }
  }, [spots]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow" />;
};

export default NightViewMap;
