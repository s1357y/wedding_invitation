import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Map from './Map'
import { wedding } from '../config/wedding'

// Kakao Maps SDK is loaded via dynamic script injection — not needed in unit tests
beforeEach(() => {
  vi.stubGlobal('kakao', undefined)
})

describe('Map', () => {
  it('Location 헤딩이 렌더링된다', () => {
    render(<Map />)
    expect(screen.getByText('Location')).toBeInTheDocument()
  })

  it('키 없을 때 플레이스홀더가 렌더링된다', () => {
    render(<Map />)
    // kakaoMapAppKey is empty in test env — placeholder should appear
    const elements = screen.getAllByText(wedding.venue.name)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('장소 주소가 렌더링된다', () => {
    render(<Map />)
    const elements = screen.getAllByText(wedding.venue.address)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('T맵 네비 버튼이 렌더링된다', () => {
    render(<Map />)
    expect(screen.getByLabelText('T맵으로 길찾기')).toBeInTheDocument()
  })

  it('카카오내비 버튼이 렌더링된다', () => {
    render(<Map />)
    expect(screen.getByLabelText('카카오내비으로 길찾기')).toBeInTheDocument()
  })

  it('네이버지도 버튼이 렌더링된다', () => {
    render(<Map />)
    expect(screen.getByLabelText('네이버지도으로 길찾기')).toBeInTheDocument()
  })

  it('네비 버튼 클릭 시 에러 없이 처리된다', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Map />)
    fireEvent.click(screen.getByLabelText('네이버지도으로 길찾기'))
    expect(openSpy).toHaveBeenCalled()
    openSpy.mockRestore()
  })
})
