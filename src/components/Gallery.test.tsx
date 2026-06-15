import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Gallery from './Gallery'

describe('Gallery', () => {
  it('Gallery 섹션 헤딩이 렌더링된다', () => {
    render(<Gallery />)
    expect(screen.getByText('Gallery')).toBeInTheDocument()
  })

  it('갤러리 버튼이 존재한다', () => {
    render(<Gallery />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('썸네일 클릭 시 라이트박스가 열린다', () => {
    render(<Gallery />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(screen.getByLabelText('닫기')).toBeInTheDocument()
  })

  it('라이트박스 닫기 버튼 클릭 시 닫힌다', () => {
    render(<Gallery />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    fireEvent.click(screen.getByLabelText('닫기'))
    expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument()
  })
})
