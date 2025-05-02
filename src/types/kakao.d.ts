export {};
declare global {
  interface Window {
    kakao: typeof kakao;
  }
  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }
      class Map {
        constructor(container: HTMLElement, options: any);
      }
      class Marker {
        constructor(options: any);
      }
      class InfoWindow {
        constructor(options: any);
        open(map: Map, marker: Marker): void;
      }
      namespace services {
        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: GeocoderResult[], status: Status) => void
          ): void;
        }
        enum Status {
          OK = "OK",
          ZERO_RESULT = "ZERO_RESULT",
          ERROR = "ERROR",
        }
        interface GeocoderResult {
          address_name: string;
          y: string;
          x: string;
        }
      }
      namespace event {
        function addListener(
          target: any, // 지도, 마커 등 이벤트를 등록할 객체
          type: string, // 이벤트 타입 (예: 'click')
          handler: (event?: any) => void // 이벤트 핸들러
        ): void;
      }
    }
  }
}
