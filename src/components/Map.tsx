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

const webTmap = `https://tmap.life/shortcut/go/?goalLat=${lat}&goalLon=${lng}&goalName=${encodeURIComponent(name)}`
const webKakao = `https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`
const webNaver = `https://map.naver.com/v5/directions/-/-/-/car?destination=${encodeURIComponent(address)}`

const NAV_BUTTONS = [
  {
    label: 'T맵',
    iconSrc: '/images/icons/tmap.png',
    href: webTmap,
    appHref: `tmap://route?goalname=${encodeURIComponent(name)}&goallat=${lat}&goallon=${lng}`,
    intentHref: `intent://route?goalname=${encodeURIComponent(name)}&goallat=${lat}&goallon=${lng}#Intent;scheme=tmap;package=com.skt.tmap.ku;S.browser_fallback_url=${encodeURIComponent(webTmap)};end`,
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
    appHref: `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=wedding`,
    intentHref: `intent://nmap/route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=wedding#Intent;scheme=nmap;package=com.nhn.android.nmap;S.browser_fallback_url=${encodeURIComponent(webNaver)};end`,
  },
]

function openNav(href: string, appHref: string, intentHref: string) {
  const ua = navigator.userAgent
  const isAndroid = /Android/.test(ua)
  const isMobile = /iPhone|iPad|iPod|Android/.test(ua)

  if (!isMobile) {
    window.open(href, '_blank', 'noopener,noreferrer')
    return
  }

  if (isAndroid) {
    // intent URL: Android OS가 앱 실행을 가로채므로 WebView 페이지 유지
    // 앱 미설치 시 S.browser_fallback_url로 자동 폴백
    window.location.href = intentHref
    return
  }

  // iOS: <a> 클릭 방식으로 현재 페이지 유지
  const link = document.createElement('a')
  link.href = appHref
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // iOS 앱 미설치 폴백
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
          {NAV_BUTTONS.map(({ label, iconSrc, href, appHref, intentHref }) => (
            <button
              key={label}
              onClick={() => openNav(href, appHref, intentHref)}
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
