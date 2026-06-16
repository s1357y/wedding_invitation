import { wedding } from '../config/wedding'

const { groom, bride, date } = wedding

export default function Footer() {
  return (
    <footer className="py-16 px-8 text-center" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto">
        <div className="w-12 mx-auto mb-6" style={{ height: '1px', background: '#bca38a', opacity: 0.5 }} />
        <p className="font-serif-theme text-xl tracking-wide mb-2" style={{ color: '#4a4a4a' }}>
          {groom.name} &amp; {bride.name}
        </p>
        <p className="text-xs font-light" style={{ color: '#8a7a6a' }}>
          {date.year}. {String(date.month).padStart(2, '0')}. {String(date.day).padStart(2, '0')}.
        </p>
        <div className="w-12 mx-auto mt-6" style={{ height: '1px', background: '#bca38a', opacity: 0.5 }} />
        <p className="text-[10px] tracking-widest mt-8 font-light" style={{ color: '#bca38a', opacity: 0.7 }}>
          Thank You
        </p>
      </div>
    </footer>
  )
}
