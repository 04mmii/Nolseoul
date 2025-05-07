export interface CulturalSpace {
  FAC_CODE: string | number; // 여기에 FAC_CODE 추가
  FAC_NAME: string; // 시설명
  ADDR: string; // 주소
  PHNE: string; // 전화번호
  FAX?: string; // 팩스 (선택적)
  HOMEPAGE?: string; // 홈페이지 URL
  X_COORD: number; // 경도 (longitude)
  Y_COORD: number; // 위도 (latitude)
  DTLCONT: string; // 상세 소개
  IMG_URL?: string; // 대표 이미지 URL (선택적)
  RELATE_SUBJ_NM?: string; // 주제 분류 (선택적)
  TICKET_YN?: string; // 관람료 유/무료 여부
  CLOSEDAY?: string; // 휴관일
  TRAFFIC_INFO?: string; // 교통 정보 (버스 등)
  err: string;
  MAIN_IMG?: string;
  SUBJCODE?: string;
  FAC_DESC?: string;
  faccode: string;
  NUM: string;
}
// export interface CulturalSpace {
//   FAC_CODE: string | number; // 여기에 FAC_CODE 추가
//   fac_name: string; // 시설명
//   addr: string; // 주소
//   phne: string; // 전화번호
//   fax?: string; // 팩스 (선택적)
//   homepage?: string; // 홈페이지 URL
//   x_coord: number; // 경도 (longitude)
//   y_coord: number; // 위도 (latitude)
//   DTLCONT: string; // 상세 소개
//   entrfree?: string; // 관람료 유/무료 여부
//   closeday?: string; // 휴관일
//   busstop?: string; // 교통 정보 (버스 등)
//   err: string;
//   main_img?: string;
//   subjcode?: string;
//   fac_desc?: string;
//   num: number | string;
// }
