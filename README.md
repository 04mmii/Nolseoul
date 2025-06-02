# 🎉 놀서울 (NolSeoul)

> "서울에서 놀다"라는 의미로 서울에서 즐길수있는 것들을 알려주는 사이트를 만들어보고자 프로젝트를 진행하게되었습니다.

## 📌 프로젝트 개요

**놀서울(NolSeoul)**은 서울시의 문화행사, 문화공간, 야경명소 정보를 통합 제공하는 웹 애플리케이션입니다.  
서울시 공공 API를 활용해 실시간 데이터를 제공하며, 위치 기반 지도 보기, 행사 상세 정보 모달 등 사용자 중심의 편의 기능을 제공합니다.

- 🔍 문화 행사 카테고리별 필터링 및 상세 모달
- 🗺️ Kakao Map 연동을 통한 지도 정보 제공
- 🌃 야경 명소 추천 및 카드 뷰
- 🖥️ 반응형 디자인

---

## 🚀 배포 링크

🔗 [놀서울 바로가기](https://nolseoul.vercel.app/)  


---

## 🛠️ 사용 기술 스택

| 분야         | 기술                                                    |
|--------------|---------------------------------------------------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS                   |
| **API 연동** | 서울시 열린데이터광장 API, Kakao Map API                  |
| **상태 관리**| React Query (@tanstack/react-query)                     |
| **날짜 처리**| dayjs                                                   |
| **기타**     | Swiper.js (슬라이더), Lucide-react (아이콘)              |
| **배포**     | Vercel                                                 |

---

## 📡 연동 API 목록

| API 이름 | 설명 |
|----------|------|
| OA-21052 | 서울시 문화행사 정보 |
| OA-15486 | 서울시 문화공간 정보 |
| OA-22579 | 서울시 야경명소 홍보자료 |
| Kakao Map API | 위치 및 마커 지도 표시 |

---

# 주요 라이브러리
npm install react react-dom react-router-dom
npm install axios dayjs fast-xml-parser clsx swiper lucide-react
npm install @tanstack/react-query

# 개발 도구
npm install -D typescript tailwindcss postcss autoprefixer
npm install -D eslint @vitejs/plugin-react @types/react @types/react-dom


📝 구현 이슈 및 해결
문제	해결 방법
XML → JSON 파싱	fast-xml-parser 사용하여 변환
날짜 필터 문제	dayjs 확장 플러그인으로 보완
Vercel 404 오류	vercel.json에 trailingSlash: true 설정



