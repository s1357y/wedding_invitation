import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cover from './Cover'
import { wedding } from '../config/wedding'

describe('Cover', () => {
  it('신랑/신부 이름이 렌더링된다', () => {
    render(<Cover />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(wedding.groom.name)
    expect(heading).toHaveTextContent(wedding.bride.name)
  })

  it('D-Day 또는 D+ 표시가 렌더링된다', () => {
    render(<Cover />)
    const dday = screen.getByText(/^D[-+]/)
    expect(dday).toBeInTheDocument()
  })

  it('Wedding Invitation 텍스트가 있다', () => {
    render(<Cover />)
    expect(screen.getByText(/Wedding Invitation/i)).toBeInTheDocument()
  })
})
