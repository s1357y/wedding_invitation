import { wedding } from '../config/wedding'

export default function Cover() {
  return (
    <section className="pb-0" style={{ background: '#fdfcf9' }}>
      <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
