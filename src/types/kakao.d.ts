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
        close(): void;
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
          target: any,
          type: string,
          handler: (event?: any) => void
        ): void;
      }
    }
  }
}
