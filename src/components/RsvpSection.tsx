interface Props {
  onOpen: () => void
}

export default function RsvpSection({ onOpen }: Props) {
  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto text-center">
        <p className="text-lg font-serif-theme font-medium mb-2" style={{ color: '#5a3020' }}>참석 여부 전달</p>

        <p className="text-xs font-light leading-loose mb-10" style={{ color: '#8a7a6a' }}>
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
          의사 전달하기
        </button>
      </div>
    </section>
  )
}
