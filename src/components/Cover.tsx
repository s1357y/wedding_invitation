import { useEffect, useRef } from 'react'
import { wedding } from '../config/wedding'

export default function Cover() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    function onScroll() {
      const img = imgRef.current
      if (!img) return
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      img.style.transform = `scale(${1 + progress * 0.12})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="pb-0">
      <div className="w-full overflow-hidden" style={{ height: '100svh' }}>
        <img
          ref={imgRef}
          src={wedding.coverImage}
          alt="웨딩 커버"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center', willChange: 'transform' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
