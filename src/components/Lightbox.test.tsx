import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Lightbox from './Lightbox'

const mockImages = ['/img1.jpg', '/img2.jpg', '/img3.jpg']

describe('Lightbox', () => {
  it('첫 번째 이미지가 렌더링된다', () => {
    render(<Lightbox images={mockImages} initialIndex={0} onClose={vi.fn()} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBeGreaterThan(0)
  })

  it('닫기 버튼이 렌더링된다', () => {
    render(<Lightbox images={mockImages} initialIndex={0} onClose={vi.fn()} />)
    expect(screen.getByLabelText('닫기')).toBeInTheDocument()
  })

  it('닫기 버튼 클릭 시 onClose가 호출된다', () => {
    const onClose = vi.fn()
    render(<Lightbox images={mockImages} initialIndex={0} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('닫기'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('ESC 키 입력 시 onClose가 호출된다', () => {
    const onClose = vi.fn()
    render(<Lightbox images={mockImages} initialIndex={0} onClose={onClose} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
