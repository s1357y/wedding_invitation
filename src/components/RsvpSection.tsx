interface Props {
  onOpen: () => void
}

export default function RsvpSection({ onOpen }: Props) {
  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto text-center">
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: '2rem' }}>
          <p className="text-lg font-serif-theme font-medium mb-1.5" style={{ color: '#4a4a4a' }}>참석 여부 전달</p>
          <div style={{ height: '1px', background: '#bca38a', opacity: 0.5 }} />
        </div>

        <p className="text-sm font-light leading-loose mb-10" style={{ color: '#6a5a4a', fontFamily: "'Gowun Batang', serif" }}>
          귀한 발걸음, 정성껏 맞이하고 싶습니다.<br />
          참석 여부를 회신해 주시면 감사하겠습니다.
        </p>

        <button
          onClick={onOpen}
          style={{
            padding: '0.9rem 3rem',
            borderRadius: '12px',
            background: '#7a6454',
            color: '#ffffff',
            fontFamily: "'Gowun Batang', serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          참석 여부 전달하기
        </button>
      </div>
    </section>
  )
}
