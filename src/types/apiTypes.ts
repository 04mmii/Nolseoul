// 문화행사 정보 타입
export interface EventData {
  CODENAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  PLAYER: string;
  PROGRAM: string;
  ETC_DESC: string;
  ORG_LINK: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  STRTDATE: string;
  END_DATE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
}

// 문화공간 정보 타입
export interface PlaceData {
  GCODE: string;
  GNAME: string;
  CODENAME: string;
  NAME: string;
  MAIN_IMG: string;
  ADDRESS: string;
  PHNE: string;
  HOMEPAGE: string;
  OPENHOUR: string;
  FEE: string;
  HOLIDAY: string;
  SEATCNT: string;
  LOT: string;
  LAT: string;
}

// 야경명소 정보 타입
export interface NightSpotData {
  NAME: string;
  ADDRESS: string;
  PHNE: string;
  LOT: string;
  LAT: string;
  URL: string;
  SUMMRY: string;
  USE_TIME: string;
  CHARGES: string;
  TRAFIC_INFO: string;
}
