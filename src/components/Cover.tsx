import { wedding } from '../config/wedding'

const { groom, bride, date } = wedding

export default function Cover() {
  const { year, month, day, dayOfWeek, time } = date

  return (
    <section className="px-0 pt-0 pb-6" style={{ background: '#fdfcf9' }}>
      <div
        className="max-w-md mx-auto overflow-hidden shadow-lg relative sm:rounded-3xl sm:border-4 sm:border-white"
        style={{ aspectRatio: '3/4' }}
      >
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.02) sepia(0.05)' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-90 mb-2 font-mono">
            The Marriage of
          </p>
          <h2 className="text-3xl font-serif-theme tracking-wide">
            {groom.name.toUpperCase()} &amp; {bride.name.toUpperCase()}
          </h2>
          <div className="w-12 my-3" style={{ height: '1px', background: 'rgba(255,255,255,0.6)' }} />
          <p className="text-xs font-light tracking-widest opacity-95">
            {year}. {String(month).padStart(2, '0')}. {String(day).padStart(2, '0')}. {dayOfWeek}. {time}
          </p>
        </div>
      </div>
    </section>
  )
}
