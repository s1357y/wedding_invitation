import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { wedding } from '../config/wedding'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full shadow-lg z-40 pointer-events-none"
      style={{ background: '#4a4a4a', color: '#ffffff' }}>
      {message}
    </div>
  )
}

async function copyAccount(number: string, onToast: (msg: string) => void) {
  const clean = number.replace(/-/g, '')
  try {
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
    onToast('계좌번호가 복사되었습니다.')
  } catch {
    onToast('복사에 실패했습니다.')
  }
}

const GROUPS = [
  {
    label: '신랑측',
    accounts: wedding.accounts.filter((a) =>
      a.owner.includes('신랑') || a.owner.includes(wedding.groom.name)
    ),
  },
  {
    label: '신부측',
    accounts: wedding.accounts.filter((a) =>
      a.owner.includes('신부') || a.owner.includes(wedding.bride.name)
    ),
  },
]

export default function Account() {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  function toggle(label: string) {
    setOpenGroup((prev) => (prev === label ? null : label))
  }

  function handleCopy(number: string) {
    copyAccount(number, (msg) => {
      setToast(msg)
      setTimeout(() => setToast(''), 2000)
    })
  }

  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <p
        className="text-[10px] tracking-[0.35em] uppercase text-center mb-2 font-medium"
        style={{ color: '#bca38a' }}
      >
        Maeum Jeonhagi
      </p>
      <p className="text-xs text-center mb-8 font-light" style={{ color: '#8a7a6a' }}>마음 전하기</p>

      <div className="max-w-md mx-auto space-y-3">
        {GROUPS.map(({ label, accounts }) => (
          <div key={label} className="rounded-2xl border overflow-hidden" style={{ borderColor: '#f0ede9' }}>
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              style={{ background: '#ffffff' }}
              onClick={() => toggle(label)}
              aria-expanded={openGroup === label}
            >
              <span className="text-sm font-medium" style={{ color: '#4a4a4a' }}>{label}</span>
              <ChevronDown
                className="w-4 h-4 transition-transform duration-300"
                style={{
                  color: '#bca38a',
                  transform: openGroup === label ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                aria-hidden
              />
            </button>

            {openGroup === label && (
              <div className="border-t" style={{ borderColor: '#f0ede9' }}>
                {accounts.map((acc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-4 border-b last:border-b-0"
                    style={{ borderColor: '#f0ede9', background: '#fdfcf9' }}
                  >
                    <div>
                      <p className="text-[10px] tracking-wider mb-0.5" style={{ color: '#8a7a6a' }}>{acc.owner}</p>
                      <p className="text-sm" style={{ color: '#4a4a4a' }}>{acc.bank} {acc.number}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(acc.number)}
                      className="shrink-0 ml-3 text-xs rounded-full px-3 py-1.5 border"
                      style={{ borderColor: '#bca38a', color: '#bca38a' }}
                    >
                      복사
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {toast && <Toast message={toast} />}
    </section>
  )
}
