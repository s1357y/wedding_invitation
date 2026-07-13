import { Phone } from 'lucide-react'
import { wedding } from '../config/wedding'

const { groom, bride } = wedding

function PhoneBtn({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="ml-3 flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center"
      style={{ borderColor: '#bca38a', color: '#bca38a' }}
      aria-label={`${phone}에 전화하기`}
    >
      <Phone className="w-3 h-3" aria-hidden />
    </a>
  )
}

export default function Contact() {
  return (
    <section
      className="py-12 px-8 text-center border-t border-b"
      style={{ background: '#ffffff', borderColor: '#f0ede9' }}
    >
      <div className="max-w-xl mx-auto">
        <div className="max-w-xs mx-auto">
          <div
            className="py-5 px-6 rounded-2xl border space-y-5"
            style={{ background: '#fdfcf9', borderColor: '#f0ede9' }}
          >
            {/* 신랑 */}
            <div className="text-left">
              <p className="text-[10px] mb-1 tracking-wider font-medium" style={{ color: '#8a7a6a' }}>
                신랑 혼주
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm leading-none" style={{ color: '#4a4a4a' }}>
                  {groom.fatherName} · {groom.motherName}
                  <span className="text-xs mx-1" style={{ color: '#8a7a6a' }}>의 아들</span>
                  <span className="font-semibold text-base" style={{ color: '#4a4a4a' }}>{groom.name}</span>
                </p>
                <PhoneBtn phone={groom.phone} />
              </div>
            </div>

            <div className="h-px" style={{ background: '#f0ede9' }} />

            {/* 신부 */}
            <div className="text-left">
              <p className="text-[10px] mb-1 tracking-wider font-medium" style={{ color: '#8a7a6a' }}>
                신부 혼주
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm leading-none" style={{ color: '#4a4a4a' }}>
                  {bride.fatherName} · {bride.motherName}
                  <span className="text-xs mx-1" style={{ color: '#8a7a6a' }}>의 딸</span>
                  <span className="font-semibold text-base" style={{ color: '#4a4a4a' }}>{bride.name}</span>
                </p>
                <PhoneBtn phone={bride.phone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
