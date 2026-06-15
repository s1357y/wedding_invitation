import { describe, it, expect } from 'vitest'

describe('main entry', () => {
  it('root 엘리먼트가 존재한다', () => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
    expect(document.getElementById('root')).toBeInTheDocument()
    document.body.removeChild(root)
  })
})
