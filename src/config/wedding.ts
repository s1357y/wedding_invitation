function normalizeEnvValue(value: string | undefined) {
  const trimmed = value?.replace(/^﻿/, '').trim()
  return trimmed ? trimmed : undefined
}

function normalizeUrl(value: string | undefined) {
  return value?.replace(/\/+$/, '')
}

const kakaoJavaScriptKey = normalizeEnvValue(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY as string | undefined)
const kakaoMapAppKey = normalizeEnvValue(import.meta.env.VITE_KAKAO_MAP_APP_KEY as string | undefined)
const siteUrl = normalizeUrl(normalizeEnvValue(import.meta.env.VITE_SITE_URL as string | undefined))
const shareImagePath = '/images/og.jpg'

export const wedding = {
  coverImage: '/images/cover.jpg',
  audioSrc: '/audio/bgm.mp3',
  kakaoJavaScriptKey: kakaoJavaScriptKey ?? kakaoMapAppKey,
  kakaoMapAppKey,
  siteUrl,
  shareImagePath,
  share: {
    title: '임은총 ♥ 김세연 결혼합니다.',
    description: '10월 24일 토요일 오후 4시 · 주님의교회 중예배실 루이스홀',
  },
  groom: {
    name: '임은총',
    nameFull: '임은총',
    fatherName: '임국재',
    motherName: '김경화',
    phone: '010-8646-3066',
  },
  bride: {
    name: '김세연',
    nameFull: '김세연',
    fatherName: '김성중',
    motherName: '김정옥',
    phone: '010-0000-0000',
  },
  date: {
    year: 2026,
    month: 10,
    day: 24,
    time: '오후 4시',
    dayOfWeek: '토요일',
  },
  venue: {
    name: '주님의교회 중예배실 루이스홀',
    hall: '(정신여자중고등학교 내 김마리아회관)',
    address: '서울특별시 송파구 올림픽로4길 16',
    tel: '02-416-5181',
    lat: 37.5102,
    lng: 127.0734,
    subway: '2호선, 9호선 종합운동장역 3번 출구에서 298m (도보 약 3분)',
    bus: '종합운동장사거리 정류장 하차\n간선: 301, 333, 341, 342, 345, 360\n지선: 2415, 3217, 3322, 3411, 3412, 3414, 3422, 4318, 4319',
    parking: '교내 대운동장에 주차 가능합니다.',
    note: '교내 시설 지침에 따라, 화환은 정중히 사양합니다. 너른 양해 부탁드립니다.',
  },
  greeting: `13년의 시간 동안 서로의 곁을 지키며 깨달았습니다.

하나님 안에서, 단단함과 다정함으로
서로를 채워온 우리가 함께라면
어떤 순간에도 행복할 것임을.

이제 부부가 되어 한 길을 걸어가려 합니다.
저희 결혼식에 함께하시어,
하나님 앞에서 맺는 언약의 증인이 되어주세요.`,
  gallery: [
    '/images/gallery/01.jpg',
    '/images/gallery/02.jpg',
    '/images/gallery/03.jpg',
    '/images/gallery/04.jpg',
    '/images/gallery/05.jpg',
    '/images/gallery/06.jpg',
    '/images/gallery/07.jpg',
    '/images/gallery/08.jpg',
    '/images/gallery/09.jpg',
    '/images/gallery/10.jpg',
    '/images/gallery/11.jpg',
    '/images/gallery/12.jpg',
    '/images/gallery/13.jpg',
    '/images/gallery/14.jpg',
    '/images/gallery/15.jpg',
    '/images/gallery/16.jpg',
    '/images/gallery/17.jpg',
    '/images/gallery/18.jpg',
    '/images/gallery/19.jpg',
    '/images/gallery/20.jpg',
    '/images/gallery/21.jpg',
    '/images/gallery/22.jpg',
    '/images/gallery/23.jpg',
    '/images/gallery/24.jpg',
    '/images/gallery/25.jpg',
    '/images/gallery/26.jpg',
    '/images/gallery/27.jpg',
    '/images/gallery/28.jpg',
    '/images/gallery/29.jpg',
    '/images/gallery/30.jpg',
    '/images/gallery/31.jpg',
    '/images/gallery/32.jpg',
  ],
  accounts: [
    { name: '임은총', role: '신랑', bank: '신한은행', number: '110-395-022780', phone: '010-8646-3066' },
    { name: '김세연', role: '신부', bank: '국민은행', number: '361402-04-282884', phone: '010-8338-6028' },
    { name: '임국재', role: '신랑측 아버지', bank: '신한은행', number: '581-02-015329', phone: '010-8555-3039' },
    { name: '김경화', role: '신랑측 어머니', bank: '신한은행', number: '110-229-655618', phone: '010-5285-3066' },
    { name: '김성중', role: '신부측 아버지', bank: '국민은행', number: '208-01-0494-698', phone: '010-2390-6028' },
    { name: '김정옥', role: '신부측 어머니', bank: '하나은행', number: '568-910021-22707', phone: '010-2338-6028' },
  ],
  rsvp: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID as string | undefined,
    deadline: '2026년 10월 10일',
    description: '동행인 수와 식사 여부 조사를 위해\n참석 여부를 알려주시면 감사하겠습니다.',
  },
}
