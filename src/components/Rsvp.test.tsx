import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Rsvp from './Rsvp'

describe('Rsvp', () => {
  it('RSVP 섹션이 렌더링된다', () => {
    render(<Rsvp />)
    expect(screen.getByText('RSVP')).toBeInTheDocument()
  })

  it('성함 입력 필드가 있다', () => {
    render(<Rsvp />)
    expect(screen.getByPlaceholderText('성함')).toBeInTheDocument()
  })

  it('참석/불참 라디오 버튼이 있다', () => {
    render(<Rsvp />)
    expect(screen.getByText('참석')).toBeInTheDocument()
    expect(screen.getByText('불참')).toBeInTheDocument()
  })

  it('제출 버튼이 있다', () => {
    render(<Rsvp />)
    expect(screen.getByRole('button', { name: /참석 의사 전달하기/ })).toBeInTheDocument()
  })
})
