import chroma from 'chroma-js'
import { ACCENT_VALUE_FROM, DEFAULT_BASE_COLOR, LIGHT_MODE_LIGHTNESS_FLOOR } from './consts'
import type { GetThemeOptions, GetThemeReturn, RGB } from './models'
import { adjust, getBaseColor, getVividColors, parseOptions, scale } from './utils'

export const getColorTheme = (palette: RGB[], options?: GetThemeOptions): GetThemeReturn => {
  const parsedOptions = parseOptions(options)
  let { colorMode } = parsedOptions ?? {}
  const {
    volume,
    maxAccents,
  } = parsedOptions ?? {}

  if (!palette.length) {
    console.warn('Palette size is 0! Default grayscale theme will be used')
  }

  const vividPalette = getVividColors(palette).map(c => adjust(c, options))
  const mainColor = palette[0] ?? DEFAULT_BASE_COLOR

  if (!colorMode) {
    // If the color mode is not set explicitly, figure it out from the palette
    colorMode = chroma(mainColor).get('hsl.l') > LIGHT_MODE_LIGHTNESS_FLOOR
      ? 'light'
      : 'dark'
  }

  /**
   * Add UI colors
   */
  const baseColor = adjust(getBaseColor(mainColor), options)

  // Take accent colors
  const accentColors = vividPalette.slice(0, maxAccents)

  return {
    theme: {
      base: scale(baseColor, volume, options),
      accent: accentColors.map(color => scale(
        adjust(color, options),
        volume,
        // don't go full dark with accent colors
        { ...options, valueFrom: ACCENT_VALUE_FROM },
      )),
    },
    metadata: {
      scheme: colorMode,
    },
  }
}
