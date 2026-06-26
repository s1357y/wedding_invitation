
export default function Footer() {
  return (
    <footer className="text-center" style={{ background: '#fdfcf9' }}>
      {/* 푸터 사진 */}
      <img
        src="/images/footer.jpg"
        alt="은총 & 세연"
        style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '320px' }}
      />

      <div className="max-w-md mx-auto px-8 py-16">
        <div className="w-12 mx-auto mb-6" style={{ height: '1px', background: '#bca38a', opacity: 0.5 }} />
        <p className="text-[10px] tracking-widest mb-4 font-medium" style={{ color: '#bca38a' }}>
          Thank You
        </p>
        <p className="text-xs font-light leading-relaxed" style={{ color: '#8a7a6a' }}>
          저희의 출발점에 고운 걸음 하셔서 축복해 주신<br />
          모든 귀빈 여러분께 고개 숙여 진심으로 감사 인사를 드립니다.<br />
          보내주신 축복의 말씀 그대로 간직하며<br />
          서로 아껴주고 의지하여 복된 가정을 꾸리겠습니다.
        </p>
        <div className="w-12 mx-auto mt-8" style={{ height: '1px', background: '#bca38a', opacity: 0.3 }} />
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
