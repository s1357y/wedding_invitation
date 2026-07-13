import { wedding } from '../config/wedding'

export default function Cover() {
  return (
    <section className="pb-0" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="w-full overflow-hidden h-[100dvh] md:h-auto">
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover md:h-auto"
          style={{ objectPosition: 'center center' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
