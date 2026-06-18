import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useState, useEffect, useRef } from 'react'
import GuestBookAdmin from './components/GuestBookAdmin'
import Cover from './components/Cover'
import Greeting from './components/Greeting'
import EventInfo from './components/EventInfo'
import Gallery from './components/Gallery'
import Map from './components/Map'
import GuestBook from './components/GuestBook'
import Account from './components/Account'
import Footer from './components/Footer'
import FloatingUI from './components/FloatingUI'
import RsvpModal from './components/RsvpModal'
import RsvpPage from './components/RsvpPage'
import RsvpSection from './components/RsvpSection'

function shouldShowModal() {
  const hideUntil = localStorage.getItem('rsvp_hide_until')
  if (hideUntil && Date.now() < parseInt(hideUntil)) return false
  if (sessionStorage.getItem('rsvp_modal_shown')) return false
  return true
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation(delay)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="fade-up">
      {children}
    </div>
  )
}

function SectionLabel({ num, name }: { num: number; name: string }) {
  return (
    <div style={{
      position: 'relative',
      zIndex: 9999,
      background: '#ff0000',
      color: '#fff',
      fontSize: '28px',
      fontWeight: 900,
      padding: '8px 16px',
      letterSpacing: '0.05em',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      ★ {num}. {name}
    </div>
  )
}

const isAdmin = new URLSearchParams(window.location.search).has('admin')

export default function App() {
  if (isAdmin) return <GuestBookAdmin />
  const [showModal, setShowModal] = useState(false)
  const [showRsvpPage, setShowRsvpPage] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shouldShowModal()) return

    const handleScroll = () => {
      const trigger = triggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.8) {
        setShowModal(true)
        sessionStorage.setItem('rsvp_modal_shown', '1')
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleModalClose = () => setShowModal(false)
  const handleModalConfirm = () => {
    setShowModal(false)
    setShowRsvpPage(true)
  }
  const handleHideToday = () => {
    localStorage.setItem('rsvp_hide_until', String(Date.now() + 24 * 60 * 60 * 1000))
    setShowModal(false)
  }
  const handleRsvpPageClose = () => setShowRsvpPage(false)

  return (
    <main className="max-w-md mx-auto" style={{ background: '#fdfcf9' }}>
      {showModal && (
        <RsvpModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          onHideToday={handleHideToday}
        />
      )}
      {showRsvpPage && (
        <RsvpPage onClose={handleRsvpPageClose} />
      )}
      <FloatingUI />
      <SectionLabel num={1} name="Cover (커버)" />
      <Cover />
      <SectionLabel num={2} name="Greeting (인사말)" />
      <AnimatedSection delay={100}><Greeting /></AnimatedSection>

      {/* 모달 트리거 — Greeting 끝, EventInfo 시작 전 */}
      <div ref={triggerRef} style={{ height: '1px' }} />

      <SectionLabel num={3} name="EventInfo (예식 정보)" />
      <AnimatedSection delay={100}><EventInfo /></AnimatedSection>
      <SectionLabel num={4} name="Map (지도)" />
      <AnimatedSection delay={100}><Map /></AnimatedSection>
      <SectionLabel num={5} name="Gallery (갤러리)" />
      <AnimatedSection delay={100}><Gallery /></AnimatedSection>
      <SectionLabel num={6} name="Account (계좌번호)" />
      <AnimatedSection delay={100}><Account /></AnimatedSection>
      <SectionLabel num={7} name="GuestBook (방명록)" />
      <AnimatedSection delay={100}><GuestBook /></AnimatedSection>
      <SectionLabel num={8} name="RsvpSection (참석여부)" />
      <AnimatedSection delay={100}><RsvpSection onOpen={() => setShowRsvpPage(true)} /></AnimatedSection>
      <SectionLabel num={8} name="Footer (푸터)" />
      <Footer />
    </main>
  )
}
