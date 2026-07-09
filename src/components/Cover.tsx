import { wedding } from '../config/wedding'

export default function Cover() {
  return (
    <section className="pb-0">
      <div className="w-full overflow-hidden" style={{ height: '100dvh' }}>
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
