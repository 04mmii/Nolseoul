export interface NightViewSpot {
  // [API 필드명] = XML/JSON 키 이름과 정확히 일치
  TITLE: string; // 시설명
  ADDR: string; // 주소
  LA: string; // 위도 (문자열 형태)
  LO: string; // 경도 (문자열 형태)
  TEL_NO: string; // 전화번호
  URL: string; // 홈페이지 URL
  OPERATING_TIME: string; // 운영시간
  ENTR_FEE: string; // 이용요금
  CONTENTS?: string; // 소개내용 (XML: <CONTENTS>)
  SUBWAY: string; // 지하철 정보
  BUS: string; // 버스 정보
  MAIN_IMG?: string; // 이미지 URL (옵셔널)
  SUBJECT_CD: string; // 분류코드 (XML: <SUBJECT_CD>)
  NUM: string; // 고유번호
  PARKING_INFO?: string; // 주차정보 (샘플 데이터에 존재)
  REG_DATE?: string; // 등록일시 (샘플 데이터: "2024-06-05 00:00:00.0")
  MOD_DATE?: string; // 수정일시 (샘플 데이터: "2024-06-24 16:59:59.0")
  CONTENT: string;
}
