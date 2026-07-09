import { wedding } from '../config/wedding'

export default function Cover() {
  return (
    <section className="pb-0" style={{ background: '#fdfcf9' }}>
      <div className="w-full flex items-center justify-center" style={{ height: '100dvh', background: '#fdfcf9' }}>
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          style={{ maxWidth: '100%', maxHeight: '100dvh', objectFit: 'contain', display: 'block' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
