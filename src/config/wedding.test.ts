import { describe, it, expect } from 'vitest'
import { wedding } from './wedding'

describe('wedding config', () => {
  it('신랑/신부 이름이 존재한다', () => {
    expect(wedding.groom.name).toBeTruthy()
    expect(wedding.bride.name).toBeTruthy()
  })

  it('날짜 정보가 유효한 범위다', () => {
    expect(wedding.date.month).toBeGreaterThanOrEqual(1)
    expect(wedding.date.month).toBeLessThanOrEqual(12)
    expect(wedding.date.day).toBeGreaterThanOrEqual(1)
    expect(wedding.date.day).toBeLessThanOrEqual(31)
  })

  it('갤러리 경로 목록이 배열이다', () => {
    expect(Array.isArray(wedding.gallery)).toBe(true)
  })

  it('계좌번호 목록에 owner, bank, number 필드가 있다', () => {
    for (const acc of wedding.accounts) {
      expect(acc.name).toBeTruthy()
      expect(acc.bank).toBeTruthy()
      expect(acc.number).toBeTruthy()
    }
  })

  it('장소에 위경도가 있다', () => {
    expect(typeof wedding.venue.lat).toBe('number')
    expect(typeof wedding.venue.lng).toBe('number')
  })
})
