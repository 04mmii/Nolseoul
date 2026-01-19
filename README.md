# Nolseoul

**서울에서 놀자, 놀서울**

서울시의 문화행사, 문화공간, 야경명소 정보를 한 곳에서 확인할 수 있는 웹 애플리케이션입니다.

로고 및 UI 디자인, 프론트엔드 개발까지 직접 진행한 개인 프로젝트입니다.

## 배포 링크

https://nolseoul.vercel.app/

## 주요 기능

- 문화행사 / 문화공간 / 야경명소 정보 조회
- 카테고리 필터 및 검색
- 행사/공간 상세 정보 모달
- KakaoMap 기반 위치 표시
- 다국어 지원 (한국어/영어)
- 반응형 웹

## 주요 화면

![놀서울 메인화면](https://github.com/user-attachments/assets/2c9e1b92-5c78-4d19-8437-65889e932f4c)

## 기술 스택

| 분야 | 기술 |
|------|------|
| Frontend | React 19, TypeScript, Vite |
| 스타일링 | Tailwind CSS |
| 상태 관리 | TanStack React Query |
| 라우팅 | React Router DOM v7 |
| 다국어 | i18next, react-i18next |
| 지도 | Kakao Map API |
| 날짜 | Day.js |
| UI | Swiper.js, Lucide React |
| 배포 | Vercel |

## 프로젝트 구조

```
src/
├── components/
│   ├── Banner/          # 히어로 슬라이더
│   ├── Common/          # 공통 컴포넌트 (필터, 페이지네이션, 언어전환)
│   ├── CulturalSpace/   # 문화공간 관련
│   ├── Events/          # 문화행사 관련
│   ├── Layout/          # 헤더, 푸터, 네비게이션
│   ├── Map/             # 카카오맵
│   └── Places/          # 야경명소 관련
├── hooks/               # 커스텀 훅 (데이터 페칭)
├── i18n/                # 다국어 설정
├── pages/               # 페이지 컴포넌트
├── types/               # TypeScript 타입
└── utils/               # 유틸리티 함수
```

## 연동 API

| API | 설명 |
|-----|------|
| OA-21052 | 서울시 문화행사 정보 |
| OA-15486 | 서울시 문화공간 정보 |
| OA-22579 | 서울시 야경명소 홍보자료 |
| Kakao Map API | 위치 및 마커 지도 표시 |

## 주요 이슈 및 해결

### 1. API 연동 및 타입 관리
- **문제**: 공공데이터 API마다 응답 구조가 달라 타입 관리와 재사용성이 떨어졌습니다.
- **해결**: 공통 데이터 스키마와 TypeScript 타입을 정의하고, `useEvents`, `useCulturalSpaces`, `useNightViewSpots` 등 Custom Hook 내부에서 변환·정제 로직을 캡슐화해 컴포넌트 코드를 단순화했습니다.

### 2. Kakao Map 로딩 타이밍
- **문제**: Kakao Map 스크립트 로딩 시점과 React 컴포넌트 마운트 시점이 맞지 않아 지도 초기화 에러가 발생했습니다.
- **해결**: `useKakaoLoader` Hook을 구현해 `kakao.maps.load`와 Geocoder 호출 타이밍을 제어하고, 지도가 준비된 이후에만 관련 로직이 실행되도록 분리했습니다.

### 3. 성능 최적화(LCP)
- **문제**: 첫 페이지 진입 시 이미지 로딩과 초기 렌더링이 느려 LCP가 13.9초, Lighthouse Performance 점수가 66점에 불과했습니다.
- **해결**:
  - 주요 이미지를 WebP로 변환하고 `picture` 태그를 사용해 용량을 70~90%까지 감소시켰습니다.
  - 리스트·카드 영역에 Skeleton UI를 적용해 체감 로딩 속도를 개선했습니다.
  - React Query 캐싱으로 동일 데이터에 대한 API 재요청을 없애 불필요한 네트워크 사용을 줄였습니다.
- **결과**: LCP를 13.9초에서 3.9초로 약 72% 단축했고, Performance 점수는 66점에서 89점으로 35% 향상되었습니다.

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 환경 변수

```env
VITE_KAKAO_API_KEY=카카오맵_API_키
VITE_SEOUL_API_KEY=서울시_공공데이터_API_키
```
