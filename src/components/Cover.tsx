import { useEffect, useState } from 'react'
import { wedding } from '../config/wedding'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function calcDDay(): number {
  const target = new Date(wedding.date.year, wedding.date.month - 1, wedding.date.day)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export default function Cover() {
  const [dday, setDday] = useState(calcDDay)
  const titleRef = useScrollAnimation(200)
  const infoRef = useScrollAnimation(400)

  useEffect(() => {
    const id = setInterval(() => setDday(calcDDay()), 60_000)
    return () => clearInterval(id)
  }, [])

  const ddayLabel =
    dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `D+${Math.abs(dday)}`

  const { year, month, day, dayOfWeek, time } = wedding.date

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* 배경 사진 */}
      <div className="absolute inset-0">
        <img
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-serif-theme text-sm tracking-[0.3em] text-white/70 uppercase mb-8">
          Wedding Invitation
        </p>

        <h1
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="fade-up font-serif-theme text-4xl text-white mb-2 leading-tight drop-shadow-lg"
        >
          {wedding.groom.name}
          <span className="mx-3 opacity-60">&</span>
          {wedding.bride.name}
        </h1>

        <div className="w-16 h-px bg-white/50 mx-auto my-6" />

        <div
          ref={infoRef as React.RefObject<HTMLDivElement>}
          className="fade-up"
        >
          <p className="text-white/80 text-sm tracking-widest mb-1">
            {year}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')} {dayOfWeek}
          </p>
          <p className="text-white/80 text-sm mb-8">{time}</p>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/50">
            <span className="font-serif-theme text-white text-sm font-semibold">
              {ddayLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
