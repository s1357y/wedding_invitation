import { describe, it, expect } from 'vitest'
import { isValidTheme, themes, THEME_NAMES } from './themes'

describe('themes', () => {
  it('모든 테마 이름이 themes 맵에 존재한다', () => {
    for (const name of THEME_NAMES) {
      expect(themes[name]).toBeDefined()
    }
  })

  it('각 테마는 필수 CSS 변수를 모두 가진다', () => {
    const required = [
      '--color-bg',
      '--color-surface',
      '--color-text',
      '--color-muted',
      '--color-accent',
      '--color-border',
      '--font-serif',
      '--font-sans',
    ]
    for (const name of THEME_NAMES) {
      for (const key of required) {
        expect(themes[name]).toHaveProperty(key)
      }
    }
  })
})

describe('isValidTheme', () => {
  it('유효한 테마 이름을 true로 판별한다', () => {
    expect(isValidTheme('modern')).toBe(true)
    expect(isValidTheme('floral')).toBe(true)
    expect(isValidTheme('luxury')).toBe(true)
  })

  it('잘못된 값을 false로 판별한다', () => {
    expect(isValidTheme('')).toBe(false)
    expect(isValidTheme('dark')).toBe(false)
    expect(isValidTheme('MODERN')).toBe(false)
  })
})
