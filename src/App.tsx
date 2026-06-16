import { useScrollAnimation } from './hooks/useScrollAnimation'
import Cover from './components/Cover'
import Greeting from './components/Greeting'
import EventInfo from './components/EventInfo'
import Contact from './components/Contact'
import Rsvp from './components/Rsvp'
import Gallery from './components/Gallery'
import Map from './components/Map'
import GuestBook from './components/GuestBook'
import Account from './components/Account'
import Footer from './components/Footer'
import FloatingUI from './components/FloatingUI'

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation(delay)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="fade-up">
      {children}
    </div>
  )
}

export default function App() {
  return (
    <main className="max-w-md mx-auto" style={{ background: '#fdfcf9' }}>
      <FloatingUI />
      <Cover />
      <AnimatedSection><Greeting /></AnimatedSection>
      <AnimatedSection><EventInfo /></AnimatedSection>
      <AnimatedSection><Contact /></AnimatedSection>
      <AnimatedSection><Rsvp /></AnimatedSection>
      <AnimatedSection><Gallery /></AnimatedSection>
      <AnimatedSection><Map /></AnimatedSection>
      <AnimatedSection><GuestBook /></AnimatedSection>
      <AnimatedSection><Account /></AnimatedSection>
      <Footer />
    </main>
  )
}
