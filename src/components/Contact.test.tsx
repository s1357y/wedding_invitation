import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import { wedding } from '../config/wedding'

describe('Contact', () => {
  it('Contact 헤딩이 렌더링된다', () => {
    render(<Contact />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('GROOM / BRIDE 섹션이 렌더링된다', () => {
    render(<Contact />)
    expect(screen.getByText('GROOM')).toBeInTheDocument()
    expect(screen.getByText('BRIDE')).toBeInTheDocument()
  })

  it('전화 링크가 존재한다', () => {
    render(<Contact />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => expect(link).toHaveAttribute('href'))
  })

  it('신랑 이름이 렌더링된다', () => {
    render(<Contact />)
    expect(screen.getByText(wedding.groom.nameFull)).toBeInTheDocument()
  })
})
