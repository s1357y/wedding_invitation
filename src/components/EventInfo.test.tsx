import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventInfo from './EventInfo'
import { wedding } from '../config/wedding'

describe('EventInfo', () => {
  it('Event 헤딩이 렌더링된다', () => {
    render(<EventInfo />)
    expect(screen.getByText('Event')).toBeInTheDocument()
  })

  it('예식 장소명이 렌더링된다', () => {
    render(<EventInfo />)
    expect(screen.getByText(wedding.venue.name)).toBeInTheDocument()
  })

  it('예식 홀 정보가 렌더링된다', () => {
    render(<EventInfo />)
    expect(screen.getByText(wedding.venue.hall)).toBeInTheDocument()
  })

  it('날짜 정보가 렌더링된다', () => {
    render(<EventInfo />)
    expect(screen.getByText(wedding.date.time)).toBeInTheDocument()
  })
})
