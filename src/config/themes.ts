export type ThemeName = 'modern' | 'floral' | 'luxury'

export interface ThemeVars {
  '--color-bg': string
  '--color-surface': string
  '--color-text': string
  '--color-muted': string
  '--color-accent': string
  '--color-border': string
  '--font-serif': string
  '--font-sans': string
}

export const themes: Record<ThemeName, ThemeVars> = {
  modern: {
    '--color-bg': '#FFFFFF',
    '--color-surface': '#F8F8F8',
    '--color-text': '#2C2C2C',
    '--color-muted': '#888888',
    '--color-accent': '#B8A99A',
    '--color-border': '#E8E8E8',
    '--font-serif': '"OngeulipKonkon"',
    '--font-sans': '"Gowun Batang"',
  },
  floral: {
    '--color-bg': '#FDF8F3',
    '--color-surface': '#FFF5EE',
    '--color-text': '#5C4033',
    '--color-muted': '#A08070',
    '--color-accent': '#D4A5A5',
    '--color-border': '#EDD9CC',
    '--font-serif': '"OngeulipKonkon"',
    '--font-sans': '"Gowun Batang"',
  },
  luxury: {
    '--color-bg': '#1A1A1A',
    '--color-surface': '#242424',
    '--color-text': '#F5F0E8',
    '--color-muted': '#9A9080',
    '--color-accent': '#C9A84C',
    '--color-border': '#383830',
    '--font-serif': '"OngeulipKonkon"',
    '--font-sans': '"Gowun Batang"',
  },
}

export const THEME_NAMES: ThemeName[] = ['modern', 'floral', 'luxury']

export function isValidTheme(value: string): value is ThemeName {
  return THEME_NAMES.includes(value as ThemeName)
}
