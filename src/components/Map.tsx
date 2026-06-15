import { useEffect, useRef } from 'react'
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

const { lat, lng, name, hall, address, tel } = wedding.venue

const NAV_BUTTONS = [
  {
    label: 'T맵',
    iconSrc: '/images/icons/tmap.png',
    href: `https://tmap.life/shortcut/go/?goalLat=${lat}&goalLon=${lng}&goalName=${encodeURIComponent(name)}`,
    appHref: `tmap://route?goalname=${encodeURIComponent(name)}&goallat=${lat}&goallon=${lng}`,
  },
  {
    label: '카카오내비',
    iconSrc: '/images/icons/kakao_navi.png',
    href: `https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`,
    appHref: `kakaomap://route?ep=${lat},${lng}&by=CAR`,
  },
  {
    label: '네이버지도',
    iconSrc: '/images/icons/naver_map.jpg',
    href: `https://map.naver.com/v5/directions/-/-/-/car?destination=${encodeURIComponent(address)}`,
    appHref: `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=wedding`,
  },
]

function openNav(webHref: string, appHref: string) {
  const isMobile = /iPhone|iPad|iPod|Android/.test(navigator.userAgent)
  if (!isMobile) {
    window.open(webHref, '_blank', 'noopener,noreferrer')
    return
  }

  // 앱이 열리면 페이지가 hidden 상태가 됨 → fallback 타이머 취소
  const timer = setTimeout(() => {
    if (!document.hidden) {
      window.open(webHref, '_blank', 'noopener,noreferrer')
    }
  }, 1500)

  const onVisChange = () => {
    if (document.hidden) clearTimeout(timer)
    document.removeEventListener('visibilitychange', onVisChange)
  }
  document.addEventListener('visibilitychange', onVisChange)

  window.location.href = appHref
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
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: position,
          level: 4,
        })
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
    <section className="px-6 py-20 bg-theme-surface">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10 text-center">
        Location
      </p>

      <div className="max-w-sm mx-auto">
        {/* 지도 영역 */}
        {appKey ? (
          <div ref={mapRef} className="h-64 w-full rounded-xl overflow-hidden border border-theme-border" />
        ) : (
          <div className="h-64 w-full rounded-xl overflow-hidden border border-theme-border flex flex-col items-center justify-center bg-gray-100 text-gray-500 text-sm gap-2">
            <span className="text-4xl">📍</span>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-center px-4">{address}</p>
            <p className="text-xs text-gray-400 mt-1">VITE_KAKAO_MAP_APP_KEY 설정 시 지도 표시</p>
          </div>
        )}

        {/* 장소 정보 */}
        <div className="mt-4 text-center space-y-1 mb-5">
          <p className="text-theme-text font-medium">{name}</p>
          <p className="text-theme-muted text-sm">{hall}</p>
          <p className="text-theme-muted text-xs">{address}</p>
          <p className="text-theme-muted text-xs">
            <a href={`tel:${tel}`} className="underline">{tel}</a>
          </p>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="grid grid-cols-3 gap-2">
          {NAV_BUTTONS.map(({ label, iconSrc, href, appHref }) => (
            <button
              key={label}
              onClick={() => openNav(href, appHref)}
              aria-label={`${label}으로 길찾기`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              <img
                src={iconSrc}
                alt={label}
                className="w-6 h-6 rounded-md object-cover flex-shrink-0"
              />
              <span className="text-gray-700 text-xs font-medium whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
