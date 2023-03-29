import type { RGB, ThemeMap } from '../models'

export const getColorsMap = (scope: string, colors?: RGB[]) => {
  return colors?.reduce((themeMap, color, index) => {
    themeMap[`--${scope}-${index + 1}00`] = color.join(', ')
    return themeMap
  }, {} as ThemeMap)
}
