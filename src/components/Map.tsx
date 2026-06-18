import { useEffect, useRef } from 'react'
import { MapPin, Train, Bus, ParkingCircle } from 'lucide-react'
import { wedding } from '../config/wedding'

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (cb: () => void) => void
        LatLng: new (lat: number, lng: number) => object
        Map: new (container: HTMLElement, opts: object) => object
        Marker: new (opts: object) => { setMap: (map: object) => void }
      }
    }
  }
}

const { lat, lng, name, hall, address, tel, subway, bus, parking } = wedding.venue

const navName = '주님의교회'
const navQuery = `${navName}(서울 송파구 올림픽로4길 16)`

const webTmap = `https://www.tmap.co.kr/`
const webKakao = `https://map.kakao.com/link/to/${encodeURIComponent(navName)},${lat},${lng}`
const webNaver = `https://map.naver.com/v5/search/${encodeURIComponent(navQuery)}`

const NAV_BUTTONS = [
  {
    label: 'T맵',
    iconSrc: '/images/icons/tmap.png',
    href: webTmap,
    appHref: `tmap://route?goalname=${encodeURIComponent(navQuery)}&goallat=${lat}&goallon=${lng}`,
    intentHref: `intent://route?goalname=${encodeURIComponent(navQuery)}&goallat=${lat}&goallon=${lng}#Intent;scheme=tmap;package=com.skt.tmap.ku;S.browser_fallback_url=${encodeURIComponent(webTmap)};end`,
  },
  {
    label: '카카오내비',
    iconSrc: '/images/icons/kakao_navi.png',
    href: webKakao,
    appHref: `kakaomap://route?ep=${lat},${lng}&by=CAR`,
    intentHref: `intent://route?ep=${lat},${lng}&by=CAR#Intent;scheme=kakaomap;package=net.daum.android.map;S.browser_fallback_url=${encodeURIComponent(webKakao)};end`,
  },
  {
    label: '네이버지도',
    iconSrc: '/images/icons/naver_map.jpg',
    href: webNaver,
    appHref: `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(navQuery)}&appname=wedding`,
    intentHref: `intent://nmap/route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(navQuery)}&appname=wedding#Intent;scheme=nmap;package=com.nhn.android.nmap;S.browser_fallback_url=${encodeURIComponent(webNaver)};end`,
  },
]

function openNav(href: string, appHref: string, intentHref: string) {
  const ua = navigator.userAgent
  const isAndroid = /Android/.test(ua)
  const isMobile = /iPhone|iPad|iPod|Android/.test(ua)

  if (!isMobile) { window.open(href, '_blank', 'noopener,noreferrer'); return }

  if (isAndroid) {
    window.location.href = intentHref
    return
  }

  const link = document.createElement('a')
  link.href = appHref
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  const timer = setTimeout(() => {
    if (!document.hidden) window.open(href, '_blank', 'noopener,noreferrer')
  }, 1500)

  const onVisChange = () => {
    if (document.hidden) clearTimeout(timer)
    document.removeEventListener('visibilitychange', onVisChange)
  }
  document.addEventListener('visibilitychange', onVisChange)
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const appKey = wedding.kakaoMapAppKey

  useEffect(() => {
    if (!appKey) return
    const scriptId = 'kakao-map-sdk'

    function initMap() {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return
        const position = new window.kakao.maps.LatLng(lat, lng)
        const map = new window.kakao.maps.Map(mapRef.current, { center: position, level: 4 })
        const marker = new window.kakao.maps.Marker({ position })
        marker.setMap(map)
      })
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else if (window.kakao?.maps) {
      initMap()
    }
  }, [appKey])

  return (
    <section className="py-16 px-8" style={{ background: '#ffffff' }}>
      <div className="text-center mb-8">
        <p className="text-lg font-serif-theme font-medium" style={{ color: '#4a4a4a' }}>예식장 오시는 길</p>
        <div style={{ height: '1.5rem' }} />
        <svg viewBox="0 0 24 24" fill="none" stroke="#bca38a" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 mx-auto mb-4" aria-hidden>
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="5" y1="7" x2="19" y2="7" />
        </svg>
        <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.95rem', fontWeight: 700, color: '#4a4a4a', marginBottom: '0.3rem' }}>{name}</p>
        <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.8rem', color: '#8a7a6a', marginBottom: '0.2rem' }}>{hall}</p>
        <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.78rem', color: '#8a7a6a' }}>{address}</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">

        {/* 지도 */}
        {appKey ? (
          <div ref={mapRef} className="h-56 w-full rounded-2xl overflow-hidden border" style={{ borderColor: '#f0ede9' }} />
        ) : (
          <div
            className="h-56 w-full rounded-2xl overflow-hidden border flex flex-col items-center justify-center gap-2"
            style={{ borderColor: '#f0ede9', background: '#f5f1eb' }}
          >
            <MapPin className="w-6 h-6" style={{ color: '#bca38a' }} aria-hidden />
            <p className="text-sm font-medium" style={{ color: '#4a4a4a' }}>{name}</p>
            <p className="text-xs text-center px-4" style={{ color: '#8a7a6a' }}>{address}</p>
          </div>
        )}

        {/* 네비게이션 버튼 */}
        <div className="grid grid-cols-3 gap-2">
          {NAV_BUTTONS.map(({ label, iconSrc, href, appHref, intentHref }) => (
            <button
              key={label}
              onClick={() => openNav(href, appHref, intentHref)}
              aria-label={`${label}으로 길찾기`}
              className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border transition-all active:scale-95"
              style={{ background: '#ffffff', borderColor: '#f0ede9' }}
            >
              <img src={iconSrc} alt={label} className="w-5 h-5 rounded object-cover flex-shrink-0" />
              <span className="text-xs font-medium" style={{ color: '#4a4a4a' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* 교통 정보 */}
        <div className="rounded-2xl border divide-y" style={{ borderColor: '#f0ede9' }}>
          {subway && (
            <div className="px-5 py-4 flex gap-3">
              <Train className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#bca38a' }} aria-hidden />
              <div>
                <p className="text-[10px] tracking-wider font-medium mb-1" style={{ color: '#8a7a6a' }}>지하철</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4a4a4a' }}>{subway}</p>
              </div>
            </div>
          )}
          {bus && (
            <div className="px-5 py-4 flex gap-3" style={{ borderTopColor: '#f0ede9', borderTopWidth: '1px' }}>
              <Bus className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#bca38a' }} aria-hidden />
              <div>
                <p className="text-[10px] tracking-wider font-medium mb-1" style={{ color: '#8a7a6a' }}>버스</p>
                <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: '#4a4a4a' }}>{bus}</p>
              </div>
            </div>
          )}
          {parking && (
            <div className="px-5 py-4 flex gap-3" style={{ borderTopColor: '#f0ede9', borderTopWidth: '1px' }}>
              <ParkingCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#bca38a' }} aria-hidden />
              <div>
                <p className="text-[10px] tracking-wider font-medium mb-1" style={{ color: '#8a7a6a' }}>주차</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4a4a4a' }}>{parking}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
