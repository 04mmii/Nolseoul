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
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
        setLevel(level: number): void;
        setBounds(bounds: LatLngBounds, paddingTop?: number): void;
      }

      interface MapOptions {
        center: LatLng;
        level: number;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        getPosition(): LatLng;
      }
      class InfoWindow {
        constructor(options: any);
        open(map: Map, marker: Marker): void;
        close(): void;
      }

      class LatLngBounds {
        extend(latlng: LatLng): void;
      }
      interface MapOptions {
        center: LatLng;
        level: number;
      }

      interface MarkerOptions {
        map?: Map;
        position: LatLng;
      }

      interface InfoWindowOptions {
        content: string;
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
      function load(callback: () => void): void;
    }
  }
}
