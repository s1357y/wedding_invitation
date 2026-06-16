import { Heart } from 'lucide-react'
import { wedding } from '../config/wedding'

export default function Greeting() {
  return (
    <section className="py-20 px-8 text-center" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto space-y-8">
        <Heart className="w-5 h-5 mx-auto opacity-70" style={{ color: '#bca38a' }} aria-hidden />

        <div className="space-y-4">
          <p
            className="text-sm font-serif-theme italic leading-relaxed py-4 px-6 rounded-xl border"
            style={{ color: '#6a5a4a', background: '#f5f1eb', borderColor: '#ece6dd' }}
          >
            " 이는 내 뼈 중의 뼈요 살 중의 살이라 " <span className="text-[10px] not-italic" style={{ color: '#8a7a6a' }}>(창세기 2:23)</span>
          </p>
        </div>

        <div className="space-y-6 font-light text-sm leading-relaxed" style={{ color: '#5a4a3a' }}>
          <h2
            className="text-base font-serif-theme font-medium tracking-wide mb-4"
            style={{ color: '#4a4a4a' }}
          >
            소중한 분들을 초대합니다
          </h2>
          <p className="whitespace-pre-line">{wedding.greeting}</p>
        </div>
      </div>
    </section>
  )
}
