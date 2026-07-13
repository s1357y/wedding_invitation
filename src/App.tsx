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
      <Cover />
      <Greeting />

      {/* 모달 트리거 — Greeting 끝, EventInfo 시작 전 */}
      <div ref={triggerRef} style={{ height: '1px' }} />

      <AnimatedSection delay={100}><EventInfo /></AnimatedSection>
      <AnimatedSection delay={100}><Map /></AnimatedSection>
      <AnimatedSection delay={100}><Gallery /></AnimatedSection>
      <AnimatedSection delay={100}><Account /></AnimatedSection>
      <AnimatedSection delay={100}><GuestBook /></AnimatedSection>
      <AnimatedSection delay={100}><RsvpSection onOpen={() => setShowRsvpPage(true)} /></AnimatedSection>
      <Footer />
    </main>
  )
}
