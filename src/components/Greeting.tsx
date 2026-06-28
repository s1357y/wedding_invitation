import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { wedding } from '../config/wedding'

const { groom, bride, date, venue } = wedding

export default function Greeting() {
  const namesRef = useScrollAnimation(100)
  const photoRef = useScrollAnimation(0)
  return (
    <section className="pt-16 px-8 text-center" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto">

        {/* 창세기 말씀 — 박스 없이 크게 */}
        <div className="pb-12">
          <p
            className="font-serif-theme italic leading-relaxed"
            style={{ fontSize: '1.15rem', color: '#6a5a4a' }}
          >
            " 이는 내 뼈 중의 뼈요 살 중의 살이라 "
          </p>
          <p className="mt-2" style={{ fontSize: '0.78rem', color: '#a08878', fontFamily: "'Gowun Batang', serif", letterSpacing: '0.05em' }}>
            창세기 2:23
          </p>
        </div>

        {/* 인사말 본문 */}
        <div className="space-y-5 pb-20" style={{ fontFamily: "'Gowun Batang', serif", fontWeight: 400, fontSize: '0.9rem', lineHeight: '2', color: '#5a4a3a' }}>
          <p className="whitespace-pre-line">{wedding.greeting}</p>
        </div>

        {/* 이름 + 부모님 */}
        <div ref={namesRef as React.RefObject<HTMLDivElement>} className="fade-up">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0', marginBottom: '1.5rem' }}>
          {/* 신랑 */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '2rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              {groom.name}
            </p>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.72rem', color: '#a08878', letterSpacing: '0.03em', lineHeight: '1.6' }}>
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
          </div>

          {/* 중앙 장식 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '2rem 0.6rem 0' }}>
            <svg viewBox="0 0 32 29" style={{ width: '1.1rem', height: '1.1rem', opacity: 0.45 }} xmlns="http://www.w3.org/2000/svg">
              <path d="M16 27 C16 27 2 18 2 9.5 C2 5.36 5.36 2 9.5 2 C12.04 2 14.28 3.28 16 5.18 C17.72 3.28 19.96 2 22.5 2 C26.64 2 30 5.36 30 9.5 C30 18 16 27 16 27Z" fill="#c9a98a" />
            </svg>
          </div>

          {/* 신부 */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '2rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              {bride.name}
            </p>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.72rem', color: '#a08878', letterSpacing: '0.03em', lineHeight: '1.6' }}>
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
          </div>
        </div>

        {/* 가로 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#d6c9bc' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#c4b09a' }} />
          <div style={{ flex: 1, height: '1px', background: '#d6c9bc' }} />
        </div>

        {/* 날짜 · 장소 */}
        <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.88rem', color: '#7a6a5a', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          {date.year}.{String(date.month).padStart(2, '0')}.{String(date.day).padStart(2, '0')}. {date.dayOfWeek}. {date.time}
        </p>
        <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.85rem', color: '#7a6a5a', letterSpacing: '0.05em', paddingBottom: '3rem' }}>
          {venue.name} {venue.hall.split('(')[0].trim()}
        </p>
        </div>

      </div>

      {/* 커플 사진 */}
      <div ref={photoRef as React.RefObject<HTMLDivElement>} className="fade-up" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <img
          src="/images/greeting.jpg"
          alt="은총 & 세연"
          style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '480px', objectPosition: 'center top' }}
        />
      </div>
    </section>
  )
}
