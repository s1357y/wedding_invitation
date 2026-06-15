import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { themes } from '../config/themes'

beforeEach(() => {
  document.documentElement.removeAttribute('style')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('useTheme', () => {
  it('기본값으로 modern 테마 CSS 변수를 주입한다', async () => {
    vi.stubEnv('VITE_THEME', 'modern')
    const { useTheme } = await import('./useTheme')
    renderHook(() => useTheme())
    const style = document.documentElement.style
    expect(style.getPropertyValue('--color-bg')).toBe(themes.modern['--color-bg'])
  })

  it('잘못된 VITE_THEME 값이면 modern으로 폴백한다', async () => {
    vi.stubEnv('VITE_THEME', 'invalid-theme')
    const { useTheme } = await import('./useTheme')
    renderHook(() => useTheme())
    expect(document.documentElement.style.getPropertyValue('--color-accent')).toBe(
      themes.modern['--color-accent']
    )
  })
})
