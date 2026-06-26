# 모바일 웨딩 청첩장

임은총 & 김세연 결혼식을 위한 모바일 청첩장 웹앱입니다

**라이브 링크**: [mobileweddinginvitation.vercel.app](https://mobileweddinginvitation.vercel.app)

## 테마별 샘플 화면

`main` 브랜치는 `VITE_THEME` 환경 변수로 3가지 테마를 지원합니다.

### Modern (기본)

흰 배경 · 베이지 포인트 · Playfair Display

<table>
  <tr>
    <td><img src="docs/screenshots/modern_01_cover.png" width="190"/></td>
    <td><img src="docs/screenshots/modern_02_greeting.png" width="190"/></td>
    <td><img src="docs/screenshots/modern_03_gallery.png" width="190"/></td>
    <td><img src="docs/screenshots/modern_04_map.png" width="190"/></td>
  </tr>
  <tr>
    <td align="center">커버</td>
    <td align="center">인사말</td>
    <td align="center">갤러리</td>
    <td align="center">오시는 길</td>
  </tr>
</table>

### Floral

크림 배경 · 로즈핑크 포인트 · Cormorant Garamond

<table>
  <tr>
    <td><img src="docs/screenshots/floral_01_cover.png" width="190"/></td>
    <td><img src="docs/screenshots/floral_02_greeting.png" width="190"/></td>
    <td><img src="docs/screenshots/floral_03_gallery.png" width="190"/></td>
    <td><img src="docs/screenshots/floral_04_map.png" width="190"/></td>
  </tr>
  <tr>
    <td align="center">커버</td>
    <td align="center">인사말</td>
    <td align="center">갤러리</td>
    <td align="center">오시는 길</td>
  </tr>
</table>

### Luxury

다크 배경 · 골드 포인트 · Cinzel

<table>
  <tr>
    <td><img src="docs/screenshots/luxury_01_cover.png" width="190"/></td>
    <td><img src="docs/screenshots/luxury_02_greeting.png" width="190"/></td>
    <td><img src="docs/screenshots/luxury_03_gallery.png" width="190"/></td>
    <td><img src="docs/screenshots/luxury_04_map.png" width="190"/></td>
  </tr>
  <tr>
    <td align="center">커버</td>
    <td align="center">인사말</td>
    <td align="center">갤러리</td>
    <td align="center">오시는 길</td>
  </tr>
</table>

## 주요 기능

- **커버** — 웨딩 사진 + 다크 그래디언트 오버레이, 신랑·신부 이름 및 날짜
- **인사말** — 성경 구절 인용, 개인 메시지
- **날짜 · D-day** — 월별 캘린더 위젯, 실시간 카운트다운 타이머
- **혼주 연락처** — 전화 버튼 포함 카드 UI
- **참석 여부 전달** — 카드 버튼 → 인라인 폼 전환 (Formspree 연동)
- **갤러리** — 2열 3:4 비율 그리드, 라이트박스
- **예식장 오시는 길** — 카카오맵 연동, T맵·카카오내비·네이버지도 딥링크, 교통 정보
- **축복의 기도 편지함** — localStorage 기반 방명록
- **마음 전하실 곳** — 신랑·신부측 아코디언 계좌번호 (복사 기능)
- **배경음악** — 토글 가능한 오디오 플레이어
- **공유** — Web Share API

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Vite + React + TypeScript |
| 스타일 | Tailwind CSS + CSS Variables |
| 아이콘 | lucide-react |
| 지도 | Kakao Maps SDK |
| RSVP | Formspree |
| 배포 | Vercel (`feature/sehyun` 브랜치) |

## 환경 변수

```env
VITE_KAKAO_MAP_APP_KEY=카카오맵_앱키
VITE_FORMSPREE_ID=Formspree_폼ID
```

## 로컬 실행

```bash
npm install
npm run dev
```
