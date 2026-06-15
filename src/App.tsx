import { useTheme } from './hooks/useTheme'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import Cover from './components/Cover'
import Greeting from './components/Greeting'
import EventInfo from './components/EventInfo'
import Gallery from './components/Gallery'
import Map from './components/Map'
import Contact from './components/Contact'
import Account from './components/Account'
import Rsvp from './components/Rsvp'
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
  useTheme()

  return (
    <main className="max-w-md mx-auto">
      <FloatingUI />
      <Cover />
      <AnimatedSection delay={0}><Greeting /></AnimatedSection>
      <AnimatedSection delay={100}><EventInfo /></AnimatedSection>
      <AnimatedSection delay={0}><Gallery /></AnimatedSection>
      <AnimatedSection delay={0}><Map /></AnimatedSection>
      <AnimatedSection delay={0}><Contact /></AnimatedSection>
      <AnimatedSection delay={0}><Account /></AnimatedSection>
      <AnimatedSection delay={0}><Rsvp /></AnimatedSection>
    </main>
  )
}
