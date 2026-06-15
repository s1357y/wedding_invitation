import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Account from './Account'

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

describe('Account', () => {
  it('계좌번호 목록이 렌더링된다', () => {
    render(<Account />)
    const buttons = screen.getAllByText('복사')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('복사 버튼 클릭 시 클립보드에 쓴다', async () => {
    render(<Account />)
    const buttons = screen.getAllByText('복사')
    fireEvent.click(buttons[0])
    await vi.waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })
  })
})
