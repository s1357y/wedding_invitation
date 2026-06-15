# 모바일 청첩장

모바일 친화적인 웹 청첩장입니다. Vite + React + TypeScript + Tailwind CSS로 제작되었으며 Vercel을 통해 무료로 배포할 수 있습니다.

---

## 주요 기능

- **3가지 테마** — `modern` / `floral` / `luxury` 환경변수 하나로 전환
- **갤러리** — 3열 그리드 + 클릭 시 Swiper 라이트박스
- **카카오 지도** — 예식장 위치 표시 (API 키 없으면 주소 + 안내 문구로 대체)
- **길찾기 버튼** — T맵 · 카카오내비 · 네이버지도 앱 연동
- **배경음악** — 우상단 토글 버튼으로 재생/정지
- **스크롤 애니메이션** — 섹션이 뷰포트에 진입할 때 페이드인
- **RSVP 폼** — Formspree 연동 (서버 불필요)
- **계좌 정보** — 클립보드 복사 지원

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Vite + React 19 + TypeScript |
| 스타일 | Tailwind CSS v3 |
| 갤러리 | Swiper.js |
| 지도 | Kakao Maps JavaScript SDK |
| RSVP | Formspree |
| 테스트 | Vitest + @testing-library/react |
| 배포 | Vercel |

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사해 `.env` 파일을 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

```env
VITE_THEME=modern              # 테마: modern | floral | luxury
VITE_FORMSPREE_ID=xrevrnlb     # Formspree 폼 ID (https://formspree.io)
VITE_KAKAO_MAP_APP_KEY=        # 카카오 지도 앱 키 (https://developers.kakao.com)
```

### 3. 로컬 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 빌드

```bash
npm run build
```

---

## 콘텐츠 수정

모든 청첩장 내용은 **`src/config/wedding.ts`** 한 파일에서 관리합니다.

```ts
export const wedding = {
  coverImage: '/images/cover.jpg',   // 커버 배경사진
  audioSrc: '/audio/bgm.mp3',        // 배경음악

  groom: { name: '신랑이름', ... },
  bride: { name: '신부이름', ... },
  date: { year: 2026, month: 10, day: 10, time: '오후 2시 30분', ... },
  venue: { name: '웨딩홀명', address: '주소', lat: 37.5, lng: 127.0, ... },
  greeting: `인사말 텍스트`,
  gallery: ['/images/gallery/01.jpg', ...],   // 갤러리 이미지 경로
  accounts: [{ owner: '신랑 홍길동', bank: '신한은행', number: '...' }],
  rsvp: { deadline: '2026년 9월 30일' },
}
```

### 이미지 교체

| 파일 경로 | 용도 |
|-----------|------|
| `public/images/cover.jpg` | 커버 전체화면 배경 |
| `public/images/gallery/01.jpg` ~ `20.jpg` | 갤러리 사진 (최대 20장) |
| `public/audio/bgm.mp3` | 배경음악 |

---

## 테마 변경

`.env`의 `VITE_THEME` 값만 바꾸면 전체 디자인이 변경됩니다.

```env
VITE_THEME=floral   # modern | floral | luxury
```

| 테마 | 분위기 |
|------|--------|
| `modern` | 심플하고 모던한 화이트 톤 |
| `floral` | 부드러운 로즈 계열 플로럴 |
| `luxury` | 고급스러운 골드 & 딥 블루 |

---

## 배포 (Vercel)

1. [Vercel](https://vercel.com) 접속 → GitHub 연동
2. 이 레포지토리 Import
3. **Environment Variables** 탭에서 `.env`와 동일하게 값 입력
4. **Deploy** 클릭

이후 `main` 브랜치에 push하면 자동으로 재배포됩니다.

---

## 테스트

```bash
npm test
```

56개 단위 테스트가 포함되어 있습니다.

---

## 라이선스

개인 사용 목적으로 자유롭게 수정·배포 가능합니다.
