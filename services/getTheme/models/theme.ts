import type { ColorMode, RGB } from './color'

export interface Theme {
  base: RGB[]
  accent: RGB[][]
}

export interface ThemeMetadata {
  scheme: ColorMode
}
