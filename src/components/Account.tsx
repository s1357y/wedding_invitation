import { useState } from 'react'
import { ChevronDown, Phone, Copy } from 'lucide-react'
import { wedding } from '../config/wedding'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full shadow-lg z-40 pointer-events-none"
      style={{ background: '#4a4a4a', color: '#ffffff' }}>
      {message}
    </div>
  )
}

async function copyText(text: string): Promise<void> {
  const clean = text.replace(/-/g, '')
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(clean)
  } else {
    const el = document.createElement('textarea')
    el.value = clean
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

const GROUPS = [
  {
    short: '신랑측',
    accounts: wedding.accounts.filter(a => a.role.includes('신랑') || a.name === wedding.groom.name),
  },
  {
    short: '신부측',
    accounts: wedding.accounts.filter(a => a.role.includes('신부') || a.name === wedding.bride.name),
  },
]

export default function Account() {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  async function handleCopyPhone(phone: string) {
    try {
      await copyText(phone)
      showToast('전화번호가 복사되었습니다.')
    } catch {
      showToast('복사에 실패했습니다.')
    }
  }

  async function handleCopyAccount(number: string, bank: string) {
    try {
      await copyText(number)
      showToast(`${bank} 계좌번호가 복사되었습니다.`)
    } catch {
      showToast('복사에 실패했습니다.')
    }
  }

  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <p className="text-lg font-serif-theme font-medium text-center mb-8" style={{ color: '#5a3020' }}>마음 전하실 곳</p>

      <div className="max-w-md mx-auto space-y-3">
        {GROUPS.map(({ short, accounts }) => (
          <div key={short} className="rounded-2xl border overflow-hidden" style={{ borderColor: '#f0ede9' }}>
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              style={{ background: '#ffffff' }}
              onClick={() => setOpenGroup(prev => prev === short ? null : short)}
              aria-expanded={openGroup === short}
            >
              <span className="text-sm font-medium" style={{ color: '#4a4a4a' }}>
                {short} <span className="font-light text-xs" style={{ color: '#8a7a6a' }}>마음 전하실 곳</span>
              </span>
              <ChevronDown
                className="w-4 h-4 transition-transform duration-300"
                style={{ color: '#bca38a', transform: openGroup === short ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden
              />
            </button>

            {openGroup === short && (
              <div className="border-t" style={{ borderColor: '#f0ede9' }}>
                {accounts.map((acc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-4 border-b last:border-b-0"
                    style={{ borderColor: '#f0ede9', background: '#ffffff' }}
                  >
                    {/* 이름 + 역할 */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-sm font-medium" style={{ color: '#3a2e28' }}>{acc.name}</p>
                        <p className="text-[11px]" style={{ color: '#9a8878' }}>{acc.role}</p>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: '#bca38a' }}>{acc.bank} {acc.number}</p>
                    </div>

                    {/* 아이콘 버튼 */}
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <button
                        onClick={() => handleCopyPhone(acc.phone)}
                        aria-label="전화번호 복사"
                        className="flex items-center justify-center w-9 h-9 rounded-full border"
                        style={{ borderColor: '#e8ddd5', background: '#fff' }}
                      >
                        <Phone size={15} strokeWidth={1.5} style={{ color: '#9a8070' }} />
                      </button>
                      <button
                        onClick={() => handleCopyAccount(acc.number, acc.bank)}
                        aria-label="계좌번호 복사"
                        className="flex items-center justify-center w-9 h-9 rounded-full border"
                        style={{ borderColor: '#e8ddd5', background: '#fff' }}
                      >
                        <Copy size={15} strokeWidth={1.5} style={{ color: '#9a8070' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs mt-8 leading-relaxed" style={{ color: '#a09080' }}>
        교내 시설 지침에 따라, 화환은 정중히 사양합니다.<br />
        너른 양해 부탁드립니다.
      </p>

      {toast && <Toast message={toast} />}
    </section>
  )
}
