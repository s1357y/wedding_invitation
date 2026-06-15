import { useEffect } from 'react'
import { themes, isValidTheme, type ThemeName } from '../config/themes'

export function useTheme() {
  useEffect(() => {
    const raw = import.meta.env.VITE_THEME as string | undefined
    const name: ThemeName = raw && isValidTheme(raw) ? raw : 'modern'
    const vars = themes[name]
    const root = document.documentElement
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value)
    }
  }, [])
}
