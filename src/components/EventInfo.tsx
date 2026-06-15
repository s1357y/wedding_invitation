import { wedding } from '../config/wedding'

export default function EventInfo() {
  const { year, month, day, dayOfWeek, time } = wedding.date
  const { name, hall, address, tel } = wedding.venue

  return (
    <section className="px-6 py-20 bg-theme-surface text-center">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10">
        Event
      </p>

      <div className="max-w-sm mx-auto space-y-6">
        <div className="border border-theme-border rounded-xl p-6 bg-theme-bg">
          <p className="font-serif-theme text-theme-accent text-xs tracking-widest mb-3">DATE & TIME</p>
          <p className="text-theme-text text-xl font-serif-theme">
            {year}년 {month}월 {day}일 {dayOfWeek}
          </p>
          <p className="text-theme-muted text-sm mt-1">{time}</p>
        </div>

        <div className="border border-theme-border rounded-xl p-6 bg-theme-bg">
          <p className="font-serif-theme text-theme-accent text-xs tracking-widest mb-3">VENUE</p>
          <p className="text-theme-text text-lg font-semibold">{name}</p>
          <p className="text-theme-muted text-sm mt-1">{hall}</p>
          <p className="text-theme-muted text-xs mt-2">{address}</p>
          <a
            href={`tel:${tel}`}
            className="inline-block mt-3 text-xs text-theme-accent underline underline-offset-2"
          >
            {tel}
          </a>
        </div>
      </div>
    </section>
  )
}
