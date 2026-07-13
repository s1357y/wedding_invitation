import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Footer() {
  const imgRef = useScrollAnimation(200)
  const textRef = useScrollAnimation(500)

  return (
    <footer className="text-center" style={{ background: '#fdfcf9' }}>
      {/* 푸터 영상 */}
      <div ref={imgRef as React.RefObject<HTMLDivElement>} className="fade-up">
        <video
          src="/videos/footer.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '320px' }}
        />
      </div>

      <div ref={textRef as React.RefObject<HTMLDivElement>} className="fade-up max-w-xl mx-auto px-8 pt-6 pb-16">
        <p className="text-[10px] tracking-widest mb-4 font-medium" style={{ color: '#bca38a' }}>
          Thank You
        </p>
        <p className="text-xs font-light leading-relaxed" style={{ color: '#8a7a6a' }}>
          저희의 시작을 아낌없이 응원해주신<br />
          모든 분들께 진심으로 감사 인사를 드립니다.<br />
          <br />
          져주는 사람이 이기는 거라 믿으며<br />
          사랑과 섬김으로 복된 가정을 꾸리겠습니다<span style={{ fontSize: '0.95rem', lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>♥︎</span><br />
          <br />
          <br />
        </p>
      </div>

      <p style={{
        fontFamily: "'Gowun Batang', serif",
        fontSize: '0.65rem',
        color: '#bca38a',
        letterSpacing: '0.12em',
        paddingBottom: '1.5rem',
        textAlign: 'center',
      }}>
        copyright Seyeon Kim with Claude. All rights reserved.
      </p>
    </footer>
  )
}
