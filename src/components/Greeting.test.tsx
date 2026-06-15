import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'
import { wedding } from '../config/wedding'

describe('Greeting', () => {
  it('Greeting 헤딩이 렌더링된다', () => {
    render(<Greeting />)
    expect(screen.getByText('Greeting')).toBeInTheDocument()
  })

  it('인사말 텍스트가 렌더링된다', () => {
    render(<Greeting />)
    expect(
      screen.getByText((_, el) =>
        el?.tagName === 'P' && (el?.textContent?.includes('저희 두 사람이 사랑을 약속하는') ?? false)
      )
    ).toBeInTheDocument()
  })

  it('신랑 아버지 이름이 렌더링된다', () => {
    render(<Greeting />)
    expect(screen.getByText(wedding.groom.fatherName)).toBeInTheDocument()
  })
})
