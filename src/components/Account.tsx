import { useState } from 'react'
import { wedding } from '../config/wedding'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-theme-text text-theme-bg text-xs px-4 py-2 rounded-full shadow-lg z-40 pointer-events-none">
      {message}
    </div>
  )
}

export default function Account() {
  const [toast, setToast] = useState('')

  async function copy(number: string) {
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
      setToast('계좌번호가 복사되었습니다.')
    } catch {
      setToast('복사에 실패했습니다. 직접 선택해 주세요.')
    }
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <section className="px-6 py-20 bg-theme-surface">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-2 text-center">
        Maeum Jeonhagi
      </p>
      <p className="text-theme-muted text-xs text-center mb-10">마음 전하기</p>

      <div className="max-w-sm mx-auto space-y-3">
        {wedding.accounts.map((acc, i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-theme-border rounded-xl px-5 py-4 bg-theme-bg"
          >
            <div>
              <p className="text-theme-muted text-xs">{acc.owner}</p>
              <p className="text-theme-text text-sm font-medium mt-0.5">
                {acc.bank} {acc.number}
              </p>
            </div>
            <button
              onClick={() => copy(acc.number)}
              className="shrink-0 ml-3 text-xs text-theme-accent border border-theme-accent rounded-full px-3 py-1.5"
            >
              복사
            </button>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast} />}
    </section>
  )
}
