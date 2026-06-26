import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'
import { wedding } from '../config/wedding'

const { date, venue } = wedding
const WEDDING_DATE = new Date(date.year, date.month - 1, date.day, 16, 0, 0)

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function calcCountdown() {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  }
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const cells = buildCalendar(date.year, date.month)

export default function EventInfo() {
  const [countdown, setCountdown] = useState(calcCountdown)

  useEffect(() => {
    const id = setInterval(() => setCountdown(calcCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-12 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-md mx-auto space-y-8">
        {/* 섹션 제목 */}
        <div className="text-center">
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <p className="text-lg font-serif-theme font-medium mb-1.5" style={{ color: '#4a4a4a' }}>일시 및 장소</p>
            <div style={{ height: '1px', background: '#bca38a', opacity: 0.5 }} />
          </div>
        </div>

        {/* 날짜 */}
        <div className="text-center space-y-2">
          <Calendar className="w-5 h-5 mx-auto mb-3 opacity-90" style={{ color: '#bca38a' }} aria-hidden />
          <p className="text-base font-serif-theme tracking-widest" style={{ color: '#4a4a4a' }}>
            {date.year}년 {date.month}월 {date.day}일 {date.dayOfWeek} {date.time}
          </p>
        </div>

        {/* 달력 */}
        <div className="p-6 rounded-2xl shadow-sm border" style={{ background: '#fdfcf9', borderColor: '#f0ede9' }}>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                className="text-[10px] font-semibold"
                style={{ color: i === 0 ? '#f87171' : i === 6 ? '#60a5fa' : '#8a7a6a' }}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-3 text-center">
            {cells.map((d, i) => {
              const isWedding = d === date.day
              return (
                <div key={i} className="relative flex items-center justify-center h-8">
                  {d !== null && (
                    isWedding ? (
                      <>
                        <svg
                          className="absolute"
                          viewBox="0 0 32 29"
                          style={{ width: '2.2rem', height: '2.2rem', opacity: 0.4, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 27 C16 27 2 18 2 9.5 C2 5.36 5.36 2 9.5 2 C12.04 2 14.28 3.28 16 5.18 C17.72 3.28 19.96 2 22.5 2 C26.64 2 30 5.36 30 9.5 C30 18 16 27 16 27Z"
                            fill="#c9a98a"
                          />
                        </svg>
                        <span
                          className="text-sm z-10 relative"
                          style={{ color: '#5a3a2a', fontWeight: 700 }}
                        >
                          {d}
                        </span>
                      </>
                    ) : (
                      <span
                        className="text-sm z-10 relative"
                        style={{
                          color: (i % 7 === 0 || [3, 5, 9].includes(d)) ? '#c9a0a0' : i % 7 === 6 ? '#90aec0' : '#4a4a4a',
                          fontWeight: 400,
                        }}
                      >
                        {d}
                      </span>
                    )
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 카운트다운 */}
        {countdown ? (
          <div
            className="grid grid-cols-4 gap-4 py-4 px-6 rounded-2xl border text-center max-w-xs mx-auto"
            style={{ background: '#fdfcf9', borderColor: '#f0ede9' }}
          >
            {[
              { value: countdown.days, label: '일' },
              { value: countdown.hours, label: '시간' },
              { value: countdown.minutes, label: '분' },
              { value: countdown.seconds, label: '초' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-serif-theme" style={{ color: '#4a4a4a' }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-[10px] font-light mt-0.5" style={{ color: '#8a7a6a' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm font-serif-theme" style={{ color: '#bca38a' }}>
            결혼했습니다 🎉
          </p>
        )}

      </div>
    </section>
  )
}
